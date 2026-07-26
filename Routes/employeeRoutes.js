const express = require('express');
const controller = require('../Controllers/employeeController');
const { errorContext } = require('../middleware/errorHandler');
const { validateEmployee } = require('../middleware/validators');

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
 *                 - id: 'Xk9PZ'
 *                   name: Mousa Estefan
 *                   email: mousa@test.com
 *                   company_id: 'aBcD12'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/', errorContext({
    fallbackMessage: 'Unable to fetch employees due to an unexpected system error.'
}), controller.getAll);

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
 *           description: hashed ID
 *     responses:
 *       '200':
 *         description: Employee found
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: Mousa Estefan
 *               email: mousa@test.com
 *               company_id: 'aBcD12'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while fetching the employee.'
}), controller.getById);

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
 *                 description: hashed ID
 *                 example: 'aBcD12'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: Mousa Estefan
 *               email: mousa@test.com
 *               company_id: 'aBcD12'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '422':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 */
router.post('/', errorContext({
    fallbackMessage: 'An unexpected error occurred while creating the employee.',
    uniqueMessage: 'An employee with this email already exists.'
}), validateEmployee, controller.create);

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
 *           description: hashed ID
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
 *                 description: hashed ID
 *                 example: 'aBcD12'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: Updated Employee
 *               email: updated@test.com
 *               company_id: 'aBcD12'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '422':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 */
router.put('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while updating the employee.',
    uniqueMessage: 'An employee with this email already exists.'
}), validateEmployee, controller.update);

/**
 * @swagger
 * /employees/{id}:
 *   patch:
 *     tags:
 *       - Employees
 *     summary: Partially update an employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: hashed ID
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
 *                 description: hashed ID
 *                 example: 'aBcD12'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: Updated Employee
 *               email: updated@test.com
 *               company_id: 'aBcD12'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '422':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 */
router.patch('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while updating the employee.',
    uniqueMessage: 'An employee with this email already exists.'
}), validateEmployee, controller.patch);

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
 *           description: hashed ID
 *     responses:
 *       '204':
 *         description: Employee deleted successfully
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.delete('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while deleting the employee.'
}), controller.remove);

/**
 * @swagger
 * /employees/{id}/restore:
 *   post:
 *     tags:
 *       - Employees
 *     summary: Restore a soft-deleted employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: hashed ID
 *     responses:
 *       '200':
 *         description: Employee restored successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: Restored Employee
 *               email: restored@test.com
 *               company_id: 'aBcD12'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */
router.post('/:id/restore', errorContext({
    fallbackMessage: 'An unexpected error occurred while restoring the employee.'
}), controller.restore);

module.exports = router;