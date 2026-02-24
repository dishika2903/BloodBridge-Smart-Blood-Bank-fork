const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  updateRequestStatus,
  getMatchingResult,
} = require('../controllers/requestController');
const { validateBloodRequest } = require('../middleware/validateRequest');

router.post('/', validateBloodRequest, createRequest);
router.get('/', getRequests);
router.put('/status/:id', updateRequestStatus);
router.get('/match/:id', getMatchingResult);

module.exports = router;
