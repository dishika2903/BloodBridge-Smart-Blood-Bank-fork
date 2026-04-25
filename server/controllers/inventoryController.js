const Inventory = require('../models/Inventory');

const getInventory = async (req, res, next) => {
  try {
    let inventory = await Inventory.find().sort({ bloodGroup: 1 });
    const allGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    for (const group of allGroups) {
      if (!inventory.find((i) => i.bloodGroup === group)) {
        await Inventory.create({ bloodGroup: group, unitsAvailable: 0 });
      }
    }
    inventory = await Inventory.find().sort({ bloodGroup: 1 });
    res.status(200).json({ success: true, data: inventory });
  } catch (err) {
    next(err);
  }
};

const updateInventoryByBloodGroup = async (req, res, next) => {
  try {
    const { bloodGroup } = req.params;
    const { unitsAvailable } = req.body;
    const inv = await Inventory.findOneAndUpdate(
      { bloodGroup },
      { unitsAvailable, lastUpdated: new Date() },
      { new: true, upsert: true }
    );
    
    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.emit('inventory_update', inv);
    }

    res.status(200).json({ success: true, data: inv });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getInventory,
  updateInventoryByBloodGroup,
};
