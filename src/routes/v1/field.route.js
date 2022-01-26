const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const fieldValidation = require('../../validations/field.validation');
const fieldController = require('../../controllers/field.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageFields'), validate(fieldValidation.createField), fieldController.createField)
  .get(auth('getFields'), validate(fieldValidation.getFields), fieldController.getFields);

router
  .route('/:fieldId')
  .get(auth('getFields'), validate(fieldValidation.getField), fieldController.getField)
  .patch(auth('manageFields'), validate(fieldValidation.updateField), fieldController.updateField)
  .delete(auth('manageFields'), validate(fieldValidation.deleteField), fieldController.deleteField);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Fields
 *   description: Field management and retrieval
 */

/**
 * @swagger
 * /fields:
 *   post:
 *     summary: Create a field
 *     description: Only admins can create field.
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fieldName
 *               - fieldType
 *               - price
 *               - timeslots
 *               - desc
 *               - imgUrl
 *             properties:
 *               fieldName:
 *                 type: string
 *               fieldType:
 *                 type: string
 *                 enum: ['Regular', 'VIP']
 *               price:
 *                 type: string
 *               timeslots:
 *                  type: array
 *               desc:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *             example:
 *               fieldName: 'L1'
 *               fieldType: 'Regular'
 *               price: '100000'
 *               timeslots: ['8-10', '10-12']
 *               desc: 'Regular Badminton Field'
 *               imgUrl: 'www.placeholder.com/image1'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all fields
 *     description: Only admins can retrieve all fields.
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         schema:
 *           type: string
 *         description: Field name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of fields
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Field'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /fields/{id}:
 *   get:
 *     summary: Get a field
 *     description: Only admins can fetch field.
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Field id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Field'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a field
 *     description:  Only admins can update field.
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Field id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldName:
 *                 type: string
 *               fieldType:
 *                 type: string
 *                 enum: ['Regular', 'VIP']
 *               price:
 *                 type: string
 *               timeslots:
 *                  type: array
 *               desc:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *             example:
 *               fieldName: 'L1'
 *               fieldType: 'Regular'
 *               price: '100000'
 *               timeslots: ['8-10', '10-12']
 *               desc: 'Regular Badminton Field'
 *               imgUrl: 'www.placeholder.com/image1'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Field'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a field
 *     description: Only admins can delete field.
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Field id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
