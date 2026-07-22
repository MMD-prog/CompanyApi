const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const basicAuth = require('../middleware/basicAuth');

// Public route to register a new user
router.post('/register', authController.register);

// Protected route to check user profile (requires Basic Auth)
router.get('/me', basicAuth, authController.me);

module.exports = router;
