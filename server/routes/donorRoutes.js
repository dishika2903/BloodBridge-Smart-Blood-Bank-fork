const express = require('express');
const router = express.Router();
const {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} = require('../controllers/donorController');
const { validateDonor } = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, validateDonor, createDonor);
router.get('/', protect, getDonors);
router.get('/:id', protect, getDonorById);
router.put('/:id', protect, authorizeRoles('Admin'), updateDonor);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteDonor);

module.exports = router;
