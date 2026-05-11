process.env.NODE_ENV = 'test';

const request = require('supertest');
const mongoose = require('mongoose');

// Mock Mongoose connect to prevent real DB connection during tests
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue(true),
  };
});

// Mock the User model specifically for the login test
jest.mock('../models/User', () => {
  return {
    findOne: jest.fn(),
  };
});

const User = require('../models/User');
const bcrypt = require('bcrypt');
const { app } = require('../server');

describe('BloodBridge API Tests', () => {
  afterAll(async () => {
    // Clear any timers or handles if necessary
    jest.restoreAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return success true', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('BloodBridge API is running');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return a token on valid login', async () => {
      // Mock User.findOne to return a fake user
      const fakePassword = 'password123';
      const hashedPassword = await bcrypt.hash(fakePassword, 10);
      
      User.findOne.mockResolvedValue({
        _id: 'fakeUserId123',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'Hospital',
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: fakePassword,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    it('should fail with incorrect password', async () => {
      const fakePassword = 'password123';
      const hashedPassword = await bcrypt.hash(fakePassword, 10);
      
      User.findOne.mockResolvedValue({
        _id: 'fakeUserId123',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'Hospital',
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Protected Route Access (GET /api/donors)', () => {
    it('should fail when no token is provided', async () => {
      const res = await request(app).get('/api/donors');
      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Not authorized/i);
    });
  });
});
