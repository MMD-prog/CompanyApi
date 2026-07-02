const express = require('express');
const controller = require('../Controllers/employeeController');

const router = express.Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *           example: Mousa
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: List of employees
 *         content:
 *           application/json:
 *             example:
 *               total: 30
 *               offset: 0
 *               limit: 10
 *               data:
 *                 - id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *                   name: Mousa Estefan
 *                   email: mousa@test.com
 *                   company_id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Employee found
 *         content:
 *           application/json:
 *             example:
 *               id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *               name: Mousa Estefan
 *               email: mousa@test.com
 *               company_id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /employees:
 *   post:
 *     tags:
 *       - Employees
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
 *                 format: email
 *                 example: mousa@test.com
 *               company_id:
 *                 type: string
 *                 format: uuid
 *                 example: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *               name: Mousa Estefan
 *               email: mousa@test.com
 *               company_id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '422':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 */
router.post('/', controller.create);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Employee
 *               email:
 *                 type: string
 *                 format: email
 *                 example: updated@test.com
 *               company_id:
 *                 type: string
 *                 format: uuid
 *                 example: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *               name: Updated Employee
 *               email: updated@test.com
 *               company_id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '422':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '204':
 *         description: Employee deleted successfully
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.delete('/:id', controller.remove);

module.exports = router;