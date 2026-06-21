const express = require('express');
const controller = require('../Controllers/companyController');

const router = express.Router();

/**
 * @swagger
 * /companies:
 *   get:
 *     parameters:
 *         in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of companies
 *       404:
 *         description: No companies found
 *       500:
 *        description: Internal server error
 */

router.get('/', controller.getAll);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id 
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company found
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /companies:
 *   post:
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
 *                 example: swagger@contact.com
 *               address:
 *                 type: string
 *                 example: KHBP
 *     responses:
 *       201:
 *         description: Company created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /companies/{id}:
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
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', controller.remove);

module.exports = router;