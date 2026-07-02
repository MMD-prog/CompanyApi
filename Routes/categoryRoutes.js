const express = require('express');
const controller = require('../Controllers/categoryController');

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     responses:
 *       '200':
 *         description: List of all categories
 *         content:
 *           application/json:
 *             example:
 *               - id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *                 name: tech
 *               - id: '3874e4db-3eb3-4db0-9377-511ceba772e0'
 *                 name: frontend
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: tech
 *     responses:
 *       '201':
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *               name: tech
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
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     description: Deletes a category and removes it from all associated companies.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '204':
 *         description: Category deleted successfully
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.delete('/:id', controller.remove);

module.exports = router;