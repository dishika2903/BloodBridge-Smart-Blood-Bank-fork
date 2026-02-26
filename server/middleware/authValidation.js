const User = require('../models/User');

const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
};

const validateSignup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.push('Name is required');
    }
    if (!email || !isValidEmail(email)) {
      errors.push('Valid email is required');
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    if (role && !['Admin', 'Staff'].includes(role)) {
      errors.push('Role must be Admin or Staff');
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join('; ') });
    }

    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join('; ') });
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
};

