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
 *         example: BAE
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         example: 10
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
 *                 - id: 1
 *                   name: BAE
 *                   email: contact@bae.com
 *                   address: KHBP
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/',    controller.getAll);

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
 *           type: integer
 *     responses:
 *       '200':
 *         description: Company found
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: BAE
 *               email: contact@bae.com
 *               address: KHBP
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
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
 *     responses:
 *       '201':
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: SwaggerDefault
 *               email: swagger@contact.com
 *               address: KHBP
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/',   controller.create);

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
 *                 format: email
 *               address:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Updated Company
 *               email: updated@company.com
 *               address: New Address
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
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
 *           type: integer
 *     responses:
 *       '204':
 *         description: Company deleted successfully
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', controller.remove);

module.exports = router;