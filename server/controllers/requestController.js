const BloodRequest = require('../models/BloodRequest');
const Inventory = require('../models/Inventory');
const Donor = require('../models/Donor');
const { getCompatibleGroups } = require('../utils/bloodCompatibility');
const { getEligibleDonorsForGroup } = require('../middleware/checkDonorEligibility');

const createRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.create(req.body);
    
    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.emit('new_request', request);
    }

    res.status(201).json({ success: true, data: request });
  } catch (err) {
    next(err);
  }
};

const getRequests = async (req, res, next) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests, count: requests.length });
  } catch (err) {
    next(err);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { requestStatus } = req.body;
    if (!['Pending', 'Approved', 'Rejected'].includes(requestStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid request status' });
    }
    const bloodRequest = await BloodRequest.findById(id);
    if (!bloodRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    if (requestStatus === 'Approved') {
      const requestedGroup = bloodRequest.bloodGroup;
      const compatibleGroups = getCompatibleGroups(requestedGroup);
      const inventoryItems = await Inventory.find({ bloodGroup: { $in: compatibleGroups } });
      inventoryItems.sort((a, b) => (a.bloodGroup === requestedGroup ? -1 : b.bloodGroup === requestedGroup ? 1 : 0));
      let remaining = bloodRequest.unitsRequired;
      for (const inv of inventoryItems) {
        if (remaining <= 0) break;
        const deduct = Math.min(inv.unitsAvailable, remaining);
        if (deduct > 0) {
          await Inventory.findByIdAndUpdate(inv._id, {
            unitsAvailable: inv.unitsAvailable - deduct,
            lastUpdated: new Date(),
          });
          remaining -= deduct;
        }
      }
      if (remaining > 0) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient inventory to approve. Cannot deduct units.',
        });
      }
    }
    bloodRequest.requestStatus = requestStatus;
    await bloodRequest.save();
    res.status(200).json({ success: true, data: bloodRequest });
  } catch (err) {
    next(err);
  }
};

const getMatchingResult = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const bloodRequest = await BloodRequest.findById(requestId);
    if (!bloodRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    const compatibleGroups = getCompatibleGroups(bloodRequest.bloodGroup);
    const inventoryItems = await Inventory.find({ bloodGroup: { $in: compatibleGroups } });
    const totalUnits = inventoryItems.reduce((sum, inv) => sum + inv.unitsAvailable, 0);
    const eligibleDonors = [];
    for (const group of compatibleGroups) {
      const donors = await getEligibleDonorsForGroup(group);
      eligibleDonors.push(...donors.map((d) => ({ ...d.toObject(), compatibleGroup: group })));
    }
    res.status(200).json({
      success: true,
      data: {
        request: bloodRequest,
        compatibleDonors: eligibleDonors,
        availableUnitsByGroup: inventoryItems.map((i) => ({
          bloodGroup: i.bloodGroup,
          unitsAvailable: i.unitsAvailable,
        })),
        totalAvailableUnits: totalUnits,
        sufficient: totalUnits >= bloodRequest.unitsRequired,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRequest,
  getRequests,
  updateRequestStatus,
  getMatchingResult,
};
