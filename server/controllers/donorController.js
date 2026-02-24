const Donor = require('../models/Donor');

const createDonor = async (req, res, next) => {
  try {
    const donor = await Donor.create(req.body);
    res.status(201).json({ success: true, data: donor });
  } catch (err) {
    next(err);
  }
};

const getDonors = async (req, res, next) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: donors, count: donors.length });
  } catch (err) {
    next(err);
  }
};

const getDonorById = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    res.status(200).json({ success: true, data: donor });
  } catch (err) {
    next(err);
  }
};

const updateDonor = async (req, res, next) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    res.status(200).json({ success: true, data: donor });
  } catch (err) {
    next(err);
  }
};

const deleteDonor = async (req, res, next) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
};
