/* --- routes/authRoutes.js --- */
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { body } = require('express-validator');

// @route   POST /api/auth/signup
// @desc    Register a new user with username, email, and password
// @access  Public
router.post('/signup', [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], signup);

// @route   POST /api/auth/login
// @desc    Authenticate user with username/email & password
// @access  Public
router.post('/login', [
    body('loginIdentifier', 'Username or Email is required').not().isEmpty(),
    body('password', 'Password is required').exists()
], login);

module.exports = router;
