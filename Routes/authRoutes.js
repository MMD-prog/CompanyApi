const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const basicAuth = require('../middleware/basicAuth');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new user account with a username and a bcrypt-hashed password.
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
 *                 example: SecretPass123!
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *               user:
 *                 id: 1
 *                 username: john_doe
 *                 createdAt: '2026-07-22T10:00:00.000Z'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current authenticated user profile
 *     description: Returns the user profile for the credentials passed in the Basic Auth header.
 *     security:
 *       - basicAuth: []
 *     responses:
 *       '200':
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication successful
 *               user:
 *                 id: 1
 *                 username: john_doe
 *                 createdAt: '2026-07-22T10:00:00.000Z'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/me', basicAuth, authController.me);

module.exports = router;
