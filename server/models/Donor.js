const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  lastDonationDate: {
    type: Date,
    required: [true, 'Last donation date is required'],
  },
  availabilityStatus: {
    type: String,
    enum: ['Available', 'Not Available'],
    default: 'Not Available',
  },
  image: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// Middleware: auto-calculate availability (eligible if last donation > 3 months ago)
donorSchema.pre('save', function (next) {
  if (this.lastDonationDate) {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    this.availabilityStatus = this.lastDonationDate <= threeMonthsAgo ? 'Available' : 'Not Available';
  }
  next();
});

donorSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.lastDonationDate) {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    update.availabilityStatus = update.lastDonationDate <= threeMonthsAgo ? 'Available' : 'Not Available';
  }
  next();
});

module.exports = mongoose.model('Donor', donorSchema);
