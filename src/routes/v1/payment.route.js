const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(paymentValidation.createPayment), paymentController.createPayment)
  .get(validate(paymentValidation.getPayments), paymentController.getPayments);

router
  .route('/:paymentId')
  .get(auth('getPayments'), validate(paymentValidation.getPayment), paymentController.getPayment)
  .patch(auth('managePayments'), validate(paymentValidation.updatePayment), paymentController.updatePayment)
  .delete(auth('managePayments'), validate(paymentValidation.deletePayment), paymentController.deletePayment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management and retrieval
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a payment
 *     description: Only admins can create payment.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - name
 *               - email
 *               - phone
 *               - userId
 *               - fieldId
 *               - bookingId
 *               - transactionStatus
 *               - paymentStatus
 *             properties:
 *               amount:
 *                 type: number
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *               userId:
 *                 type: string
 *               fieldId:
 *                 type: string
 *               bookingId:
 *                 type: string
 *               transactionStatus:
 *                 type: string
 *                 enum: ['PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'TIMEOUT', 'REDIRECT']
 *               paymentStatus:
 *                 type: string
 *                 enum: ['PAID', 'UNPAID']
 *             example:
 *               amount: 100000
 *               name:   'John Doe'
 *               email:  'john.doe@gmail.com'
 *               userId: '61eff899c53549003313d079'
 *               fieldId: '61eff899a648348787287171'
 *               bookingId: '61eff899a648348787287171'
 *               transactionStatus: 'PENDING'
 *               paymentStatus: 'UNPAID'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payment'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Payments
 *     description: Only admins can retrieve all payments.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *       - in: query
 *         name: amount
 *         schema:
 *           type: string
 *         description: Payment user name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Payment user email
 *       - in: query
 *         name: phone
 *         schema:
 *           type: number
 *         description: Payment user phone
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Payment user id
 *       - in: query
 *         name: fieldId
 *         schema:
 *           type: string
 *         description: Payment field id
 *       - in: query
 *         name: bookingId
 *         schema:
 *           type: string
 *         description: Payment booking id
 *       - in: query
 *         name: transactionStatus
 *         schema:
 *           type: string
 *           enum: ['PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'TIMEOUT', 'REDIRECT']
 *         description: Payment transaction status
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: ['PAID', 'UNPAID', 'RESERVED']
 *         description: Payment status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *         description: Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of payments
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
 *                     $ref: '#/components/schemas/Payment'
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
 * /payments/{id}:
 *   get:
 *     summary: Get a payment
 *     description: Only admins can fetch payment.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a payment
 *     description:  Only admins can update payment.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: number
 *               userId:
 *                 type: string
 *               fieldId:
 *                 type: string
 *               bookingId:
 *                 type: string
 *               transactionStatus:
 *                 type: string
 *                 enum: ['PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'TIMEOUT', 'REDIRECT']
 *               paymentStatus:
 *                 type: string
 *                 enum: ['PAID', 'UNPAID']
 *             example:
 *               amount: 100000
 *               name:   'Alexis Sanchez'
 *               email: 'alexis.sanchez@gmail.com'
 *               userId:  '61eff899c53549003313d079'
 *               fieldId: '61eff899a648348787287171'
 *               bookingId: '61eff899a648348787287171'
 *               transactionStatus: 'SUCCESS'
 *               paymentStatus: 'PAID'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payment'
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
 *     summary: Delete a payment
 *     description: Only admins can delete payment.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment id
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
