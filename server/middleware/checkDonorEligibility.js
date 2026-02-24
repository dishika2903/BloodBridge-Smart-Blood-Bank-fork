/**
 * Middleware to check donor eligibility (last donation > 3 months ago)
 * Used when returning donors for matching - only include eligible ones
 */
const Donor = require('../models/Donor');

const checkDonorEligibility = (req, res, next) => {
  // This middleware can be used in routes that need to filter eligible donors
  // Eligibility is already computed in Donor model via pre-save
  next();
};

const getEligibleDonorsForGroup = async (bloodGroup) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return Donor.find({
    bloodGroup,
    lastDonationDate: { $lte: threeMonthsAgo },
  });
};

module.exports = { checkDonorEligibility, getEligibleDonorsForGroup };
