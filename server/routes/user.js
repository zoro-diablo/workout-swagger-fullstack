const express = require('express');
const { signupUser, loginUser, signupAdmin } = require('../controllers/userController');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// Login
router.post('/login', loginUser);

// Sign Up
router.post('/signup', signupUser);

// Create Admin by admin
router.post('/signup-admin', requireAdmin, signupAdmin);

module.exports = router;