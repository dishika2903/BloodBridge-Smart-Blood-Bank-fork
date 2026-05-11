const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn && conn.connection) {
  console.log(`MongoDB Connected: ${conn.connection.host}`);
}
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // process.exit(1);
    if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}
  }
};

module.exports = connectDB;
