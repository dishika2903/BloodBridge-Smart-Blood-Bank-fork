const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  updateRequestStatus,
  getMatchingResult,
} = require('../controllers/requestController');
const { validateBloodRequest } = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, validateBloodRequest, createRequest);
router.get('/', protect, getRequests);
router.put('/status/:id', protect, authorizeRoles('Admin'), updateRequestStatus);
router.get('/match/:id', protect, getMatchingResult);

module.exports = router;
