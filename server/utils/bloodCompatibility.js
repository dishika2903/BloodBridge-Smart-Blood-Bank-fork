/**
 * Blood compatibility rules for transfusion
 * Key = requested group, Value = array of compatible donor/inventory groups
 */
const COMPATIBILITY_MAP = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'],
};

function getCompatibleGroups(bloodGroup) {
  return COMPATIBILITY_MAP[bloodGroup] || [];
}

function getTotalUnitsFromInventory(inventoryItems, compatibleGroups) {
  return inventoryItems
    .filter((inv) => compatibleGroups.includes(inv.bloodGroup))
    .reduce((sum, inv) => sum + inv.unitsAvailable, 0);
}

module.exports = {
  COMPATIBILITY_MAP,
  getCompatibleGroups,
  getTotalUnitsFromInventory,
};
