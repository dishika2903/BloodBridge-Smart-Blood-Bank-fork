require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const donorRoutes = require('./routes/donorRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const requestRoutes = require('./routes/requestRoutes');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'BloodBridge API is running' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`BloodBridge server running on port ${PORT}`);
});
