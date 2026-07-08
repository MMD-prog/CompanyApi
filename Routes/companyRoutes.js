const express = require('express');
const controller = require('../Controllers/companyController');
const { errorContext } = require('../middleware/errorHandler');

const router = express.Router();

/**
 * @swagger
 * /companies:
 *   get:
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *           example: BAE
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: integer
 *           description: Filter companies by category ID
 *           example: 1
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: List of companies
 *         content:
 *           application/json:
 *             example:
 *               total: 42
 *               page: 1
 *               totalPages: 5
 *               data:
 *                 - id: 'Xk9PZ'
 *                   name: BAE
 *                   email: contact@bae.com
 *                   address: KHBP
 *                   category:
 *                     - id: 1
 *                       name: tech
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/', errorContext({
    fallbackMessage: 'An unexpected error occurred while fetching companies.'
}), controller.getAll);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: hashed ID
 *     responses:
 *       '200':
 *         description: Company found
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: BAE
 *               email: contact@bae.com
 *               address: KHBP
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while fetching the company.'
}), controller.getById);

/**
 * @swagger
 * /companies:
 *   post:
 *     tags:
 *       - Companies
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
 *                 example: SwaggerDefault
 *               email:
 *                 type: string
 *                 format: email
 *                 example: swagger@contact.com
 *               address:
 *                 type: string
 *                 example: KHBP
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                 description: Optional array of category IDs to link to this company
 *     responses:
 *       '201':
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: SwaggerDefault
 *               email: swagger@contact.com
 *               address: KHBP
 *               category:
 *                 - id: 1
 *                   name: tech
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '422':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 */
router.post('/', errorContext({
    fallbackMessage: 'An unexpected error occurred while creating the company.',
    uniqueMessage: 'A company with this unique record already exists.'
}), controller.create);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     tags:
 *       - Companies
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
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                 description: Replaces all linked categories with this new list
 *     responses:
 *       '200':
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: Updated Company
 *               email: updated@company.com
 *               address: New Address
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
    fallbackMessage: 'An unexpected error occurred while updating the company.',
    uniqueMessage: 'This update conflicts with an existing unique record.'
}), controller.update);

/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     tags:
 *       - Companies
 *     summary: Partially update a company
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
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *                 description: Replaces all linked categories with this new list
 *     responses:
 *       '200':
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: Updated Company
 *               email: updated@company.com
 *               address: New Address
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
    fallbackMessage: 'An unexpected error occurred while updating the company.',
    uniqueMessage: 'This update conflicts with an existing unique record.'
}), controller.patch);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: hashed ID
 *     responses:
 *       '204':
 *         description: Company deleted successfully
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.delete('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while deleting the company.'
}), controller.remove);

module.exports = router;