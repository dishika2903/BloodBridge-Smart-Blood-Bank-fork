const validateDonor = (req, res, next) => {
  const { name, bloodGroup, phone, city, lastDonationDate } = req.body;
  const errors = [];
  if (!name || typeof name !== 'string' || !name.trim()) errors.push('Valid name is required');
  if (!bloodGroup || !['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(bloodGroup)) errors.push('Valid blood group is required');
  if (!phone || typeof phone !== 'string' || !phone.trim()) errors.push('Valid phone is required');
  if (!city || typeof city !== 'string' || !city.trim()) errors.push('Valid city is required');
  if (!lastDonationDate) errors.push('Last donation date is required');
  if (lastDonationDate && isNaN(new Date(lastDonationDate).getTime())) errors.push('Invalid last donation date');
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join('; ') });
  }
  next();
};

const validateBloodRequest = (req, res, next) => {
  const { patientName, hospitalName, bloodGroup, unitsRequired } = req.body;
  const errors = [];
  if (!patientName || typeof patientName !== 'string' || !patientName.trim()) errors.push('Valid patient name is required');
  if (!hospitalName || typeof hospitalName !== 'string' || !hospitalName.trim()) errors.push('Valid hospital name is required');
  if (!bloodGroup || !['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(bloodGroup)) errors.push('Valid blood group is required');
  if (unitsRequired == null || typeof unitsRequired !== 'number' || unitsRequired < 1) errors.push('Units required must be at least 1');
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join('; ') });
  }
  next();
};

const validateInventoryUpdate = (req, res, next) => {
  const { unitsAvailable } = req.body;
  const bloodGroup = req.params.bloodGroup;
  const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  if (!bloodGroup || !validGroups.includes(bloodGroup)) {
    return res.status(400).json({ success: false, message: 'Valid blood group is required' });
  }
  if (unitsAvailable == null || typeof unitsAvailable !== 'number' || unitsAvailable < 0) {
    return res.status(400).json({ success: false, message: 'unitsAvailable must be a non-negative number' });
  }
  next();
};

module.exports = {
  validateDonor,
  validateBloodRequest,
  validateInventoryUpdate,
};
