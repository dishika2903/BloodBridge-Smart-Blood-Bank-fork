require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const donorRoutes = require('./routes/donorRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const requestRoutes = require('./routes/requestRoutes');

connectDB();

const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs');

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const session = require('express-session');

app.use(session({
  secret: 'bloodbridge-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);

app.get('/session-check', (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user
    });
  } else {
    res.json({
      loggedIn: false
    });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'BloodBridge API is running' });
});

app.get('/', (req, res) => {
  res.render('home', { message: 'EJS is working!' });
});

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`BloodBridge server running on port ${PORT}`);
});
