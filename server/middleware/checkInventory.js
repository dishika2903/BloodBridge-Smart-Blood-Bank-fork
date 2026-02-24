const Inventory = require('../models/Inventory');
const { getCompatibleGroups, getTotalUnitsFromInventory } = require('../utils/bloodCompatibility');

/**
 * Middleware to check inventory before approving request.
 * Attaches compatible inventory and total available units to req for controller use.
 */
const checkInventoryBeforeApproval = async (req, res, next) => {
  try {
    const { bloodGroup, unitsRequired } = req.body;
    const compatibleGroups = getCompatibleGroups(bloodGroup);
    const inventoryItems = await Inventory.find({ bloodGroup: { $in: compatibleGroups } });
    const totalAvailable = getTotalUnitsFromInventory(inventoryItems, compatibleGroups);
    req.compatibleInventory = inventoryItems;
    req.totalAvailableUnits = totalAvailable;
    req.unitsRequired = unitsRequired;
    req.requestedBloodGroup = bloodGroup;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { checkInventoryBeforeApproval };
