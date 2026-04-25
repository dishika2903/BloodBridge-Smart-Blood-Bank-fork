const express = require('express');
const router = express.Router();
const {
  getInventory,
  updateInventoryByBloodGroup,
} = require('../controllers/inventoryController');
const { validateInventoryUpdate } = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/', protect, getInventory);
router.put('/update/:bloodGroup', protect, authorizeRoles('Admin'), validateInventoryUpdate, updateInventoryByBloodGroup);

module.exports = router;
