const express = require('express');
const controller = require('../Controllers/employeeController');

const router = express.Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         example: Mousa
 *     responses:
 *       200:
 *         description: List of employees
 *       404:
 *         description: No employees found matching the search criteria
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /employees:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - company_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mousa Estefan
 *               email:
 *                 type: string
 *                 example: mousa@test.com
 *               company_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               company_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', controller.remove);

module.exports = router;