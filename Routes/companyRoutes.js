const express = require('express');
const controller = require('../Controllers/companyController');

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
 *           type: string
 *           description: Filter companies by category name
 *           example: tech
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
 *                 - id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *                   name: BAE
 *                   email: contact@bae.com
 *                   address: KHBP
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/', controller.getAll);

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
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Company found
 *         content:
 *           application/json:
 *             example:
 *               id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *               name: BAE
 *               email: contact@bae.com
 *               address: KHBP
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.get('/:id', controller.getById);

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
 *                   type: string
 *                   format: uuid
 *                 example: ['d290f1ee-6c54-4b01-90e6-d701748f0851']
 *                 description: Optional array of category IDs to link to this company
 *     responses:
 *       '201':
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *               name: SwaggerDefault
 *               email: swagger@contact.com
 *               address: KHBP
 *               Categories:
 *                 - id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
 *                   name: tech
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
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ['d290f1ee-6c54-4b01-90e6-d701748f0851']
 *                 description: Replaces all linked categories with this new list
 *     responses:
 *       '200':
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
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
router.put('/:id', controller.update);

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
 *           format: uuid
 *     responses:
 *       '204':
 *         description: Company deleted successfully
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.delete('/:id', controller.remove);

module.exports = router;