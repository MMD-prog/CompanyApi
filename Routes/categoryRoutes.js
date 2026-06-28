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
 *               - id: 1
 *                 name: tech
 *               - id: 2
 *                 name: frontend
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
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
 *               id: 1
 *               name: tech
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', controller.create);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     description: Deletes a category and removes it from all associated companies. Companies themselves are not affected.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Category deleted successfully
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', controller.remove);

module.exports = router;
