const express = require('express');
const controller = require('../Controllers/authController');
const { errorContext } = require('../middleware/errorHandler');
const { validateAuth } = require('../middleware/validators');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

const authRateLimiter = rateLimiter({ max: 10, windowSeconds: 900, prefix: 'auth' });

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: Secret123!
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request (missing fields or duplicate username)
 */
router.post('/register', authRateLimiter, validateAuth, errorContext('Auth.Register'), controller.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user and obtain JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: Secret123!
 *     responses:
 *       '200':
 *         description: Login successful, returns JWT token
 *       '401':
 *         description: Invalid credentials
 */
router.post('/login', authRateLimiter, validateAuth, errorContext('Auth.Login'), controller.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user
 *     responses:
 *       '200':
 *         description: Logout message
 */
router.post('/logout', errorContext('Auth.Logout'), controller.logout);

module.exports = router;
