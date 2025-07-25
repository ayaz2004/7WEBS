/* --- controllers/authController.js --- */
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// --- SIGNUP ---
exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // Check if username OR email is already taken
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User with that username or email already exists' });
        }

        // Create new user with email
        user = new User({ username, email, password });
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ token, username: user.username, email: user.email });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// --- LOGIN ---
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // The 'loginIdentifier' can be either a username or an email
    const { loginIdentifier, password } = req.body;

    try {
        // Find user by either their username or email
        const user = await User.findOne({ 
            $or: [{ username: loginIdentifier }, { email: loginIdentifier }] 
        }).select('+password');

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = generateToken(user._id);
        res.json({ token, username: user.username, email: user.email });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
