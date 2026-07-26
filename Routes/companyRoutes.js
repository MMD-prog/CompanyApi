const express = require('express');
const controller = require('../Controllers/companyController');
const { errorContext } = require('../middleware/errorHandler');
const { validateCompany } = require('../middleware/validators');

const router = express.Router();

/**
 * @swagger
 * /companies:
 *   get:
 *     tags:
 *       - Companies
 *     security:
 *       - basicAuth: []
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
 *           description: Filter companies by category ID
 *           example: aZ9k2p
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
 *                     - id: aZ9k2p
 *                       name: tech
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
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
 *     security:
 *       - basicAuth: []
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
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
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
 *     security:
 *       - basicAuth: []
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
 *                   example: aZ9k2p
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
 *                 - id: aZ9k2p
 *                   name: tech
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
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
}), validateCompany, controller.create);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     tags:
 *       - Companies
 *     security:
 *       - basicAuth: []
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
 *                   type: string
 *                   example: aZ9k2p
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
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
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
}), validateCompany, controller.update);

/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     tags:
 *       - Companies
 *     security:
 *       - basicAuth: []
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
 *                   type: string
 *                   example: aZ9k2p
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
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
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
}), validateCompany, controller.patch);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     tags:
 *       - Companies
 *     security:
 *       - basicAuth: []
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
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 */
router.delete('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while deleting the company.'
}), controller.remove);

/**
 * @swagger
 * /companies/{id}/restore:
 *   post:
 *     tags:
 *       - Companies
 *     security:
 *       - basicAuth: []
 *     summary: Restore a soft-deleted company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: hashed ID
 *     responses:
 *       '200':
 *         description: Company restored successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 'Xk9PZ'
 *               name: Restored Company
 *               email: contact@company.com
 *               address: KHBP
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */
router.post('/:id/restore', errorContext({
    fallbackMessage: 'An unexpected error occurred while restoring the company.'
}), controller.restore);

module.exports = router;