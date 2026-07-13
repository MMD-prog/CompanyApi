const express = require('express');
const controller = require('../Controllers/categoryController');
const { errorContext } = require('../middleware/errorHandler');
const { validateCategory } = require('../middleware/validators');

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
 *               - id: aZ9k2p
 *                 name: tech
 *               - id: xR3m1q
 *                 name: frontend
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/', errorContext({
    fallbackMessage: 'Unable to fetch categories due to an unexpected system error.'
}), controller.getAll);

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
 *               id: aZ9k2p
 *               name: tech
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '422':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 */
router.post('/', errorContext({
    fallbackMessage: 'An unexpected error occurred while creating the category.',
    uniqueMessage: 'A category with this name already exists.'
}), validateCategory, controller.create);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Fully update a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: aZ9k2p
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Category
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: aZ9k2p
 *               name: Updated Category
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
    fallbackMessage: 'An unexpected error occurred while updating the category.',
    uniqueMessage: 'A category with this name already exists.'
}), validateCategory, controller.update);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Partially update a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: aZ9k2p
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Category
 *     responses:
 *       '200':
 *         description: Category patched successfully
 *         content:
 *           application/json:
 *             example:
 *               id: aZ9k2p
 *               name: Updated Category
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
    fallbackMessage: 'An unexpected error occurred while updating the category.',
    uniqueMessage: 'A category with this name already exists.'
}), validateCategory, controller.patch);

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
 *           example: aZ9k2p
 *     responses:
 *       '204':
 *         description: Category deleted successfully
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.delete('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while deleting the category.'
}), controller.remove);

module.exports = router;