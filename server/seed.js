require('dotenv').config();
const mongoose = require('mongoose');
const Donor = require('./models/Donor');
const Inventory = require('./models/Inventory');
const BloodRequest = require('./models/BloodRequest');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bloodbridge';

const seedDonors = [
  { name: 'Rajesh Kumar', bloodGroup: 'O+', phone: '9876543210', city: 'Mumbai', lastDonationDate: new Date('2024-08-01') },
  { name: 'Priya Sharma', bloodGroup: 'A+', phone: '9876543211', city: 'Delhi', lastDonationDate: new Date('2024-07-15') },
  { name: 'Amit Patel', bloodGroup: 'B+', phone: '9876543212', city: 'Ahmedabad', lastDonationDate: new Date('2024-06-20') },
  { name: 'Sneha Reddy', bloodGroup: 'AB+', phone: '9876543213', city: 'Hyderabad', lastDonationDate: new Date('2024-09-01') },
  { name: 'Vikram Singh', bloodGroup: 'O-', phone: '9876543214', city: 'Pune', lastDonationDate: new Date('2024-05-10') },
  { name: 'Anita Desai', bloodGroup: 'A-', phone: '9876543215', city: 'Bangalore', lastDonationDate: new Date('2024-10-01') },
];

const seedInventory = [
  { bloodGroup: 'A+', unitsAvailable: 25 },
  { bloodGroup: 'A-', unitsAvailable: 10 },
  { bloodGroup: 'B+', unitsAvailable: 20 },
  { bloodGroup: 'B-', unitsAvailable: 8 },
  { bloodGroup: 'AB+', unitsAvailable: 15 },
  { bloodGroup: 'AB-', unitsAvailable: 5 },
  { bloodGroup: 'O+', unitsAvailable: 35 },
  { bloodGroup: 'O-', unitsAvailable: 12 },
];

const seedRequests = [
  { patientName: 'Patient One', hospitalName: 'City General Hospital', bloodGroup: 'A+', unitsRequired: 2, requestStatus: 'Pending' },
  { patientName: 'Patient Two', hospitalName: 'Metro Medical', bloodGroup: 'O+', unitsRequired: 3, requestStatus: 'Approved' },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Donor.deleteMany({});
    await Donor.insertMany(seedDonors);
    console.log('Donors seeded');

    await Inventory.deleteMany({});
    await Inventory.insertMany(seedInventory);
    console.log('Inventory seeded');

    await BloodRequest.deleteMany({});
    await BloodRequest.insertMany(seedRequests);
    console.log('Blood requests seeded');

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
