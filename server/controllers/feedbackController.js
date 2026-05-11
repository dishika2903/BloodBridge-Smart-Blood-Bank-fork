const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFeedback = async (req, res, next) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name and message are required' });
    }
    const feedback = await prisma.feedback.create({
      data: {
        name,
        message,
      },
    });
    res.status(201).json({ success: true, data: feedback });
  } catch (err) {
    // Graceful error if DB is not connected
    console.error('Prisma Error:', err.message);
    res.status(500).json({ success: false, message: 'Database error or not configured yet.' });
  }
};

const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ success: true, data: feedbacks });
  } catch (err) {
    console.error('Prisma Error:', err.message);
    res.status(500).json({ success: false, message: 'Database error or not configured yet.' });
  }
};

module.exports = {
  createFeedback,
  getFeedbacks,
};
