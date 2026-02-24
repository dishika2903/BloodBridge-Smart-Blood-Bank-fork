const express = require('express');
const router = express.Router();
const {
  getInventory,
  updateInventoryByBloodGroup,
} = require('../controllers/inventoryController');
const { validateInventoryUpdate } = require('../middleware/validateRequest');

router.get('/', getInventory);
router.put('/update/:bloodGroup', validateInventoryUpdate, updateInventoryByBloodGroup);

module.exports = router;
