const express = require('express');
const controller = require('../Controllers/healthController');
const { errorContext } = require('../middleware/errorHandler');

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: System health check
 *     responses:
 *       '200':
 *         description: System healthy
 *       '503':
 *         description: Service unavailable or degraded
 */
router.get('/', errorContext('Health.Get'), controller.getHealth);

module.exports = router;
