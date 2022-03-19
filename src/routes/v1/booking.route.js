const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bookingValidation = require('../../validations/booking.validation');
const bookingController = require('../../controllers/booking.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBookings'), validate(bookingValidation.createBooking), bookingController.createBooking)
  .get(validate(bookingValidation.getBookings), bookingController.getBookings);

router
  .route('/:bookingId')
  .get(validate(bookingValidation.getBooking), bookingController.getBooking)
  .patch(auth('manageBookings'), validate(bookingValidation.updateBooking), bookingController.updateBooking)
  .delete(auth('manageBookings'), validate(bookingValidation.deleteBooking), bookingController.deleteBooking);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management and retrieval
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking
 *     description: Only admins can create booking.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - fieldId
 *               - bookingDate
 *               - bookingStatus
 *               - paymentStatus
 *               - startTime
 *               - endTime
 *             properties:
 *               userId:
 *                 type: string
 *               fieldId:
 *                 type: string
 *               bookingDate:
 *                 type: string
 *               bookingStatus:
 *                 type: string
 *                 enum: ['CONFIRMED', 'CANCELLED', 'RESERVED']
 *               paymentStatus:
 *                 type: string
 *                 enum: ['PAID', 'UNPAID']
 *               startTime:
 *                  type: string
 *               endTime:
 *                 type: string
 *             example:
 *               userId:  '61eff899c53549003313d079'
 *               fieldId: '61eff899a648348787287171'
 *               bookingDate: '31-01-2022'
 *               bookingStatus: 'CONFIRMED'
 *               paymentStatus: 'UNPAID'
 *               startTime:  '8:00'
 *               endTime: '10:00'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all bookings
 *     description: Only admins can retrieve all bookings.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bookingDate
 *         schema:
 *           type: string
 *         description: Booking date
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
 *         description: Maximum number of bookings
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
 *                     $ref: '#/components/schemas/Booking'
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
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking
 *     description: Only admins can fetch booking.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a booking
 *     description:  Only admins can update booking.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               fieldId:
 *                 type: string
 *               bookingDate:
 *                 type: string
 *               bookingStatus:
 *                 type: string
 *                 enum: ['CONFIRMED', 'CANCELLED', 'RESERVED']
 *               paymentStatus:
 *                 type: string
 *                 enum: ['PAID', 'UNPAID']
 *               startTime:
 *                  type: string
 *               endTime:
 *                 type: string
 *             example:
 *               userId:  '61eff899c53549003313d079'
 *               fieldId: '61eff899a648348787287171'
 *               bookingDate: '01-02-2022'
 *               bookingStatus: 'RESERVED'
 *               paymentStatus: 'PAID'
 *               startTime:  '8:00'
 *               endTime: '10:00'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
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
 *     summary: Delete a booking
 *     description: Only admins can delete booking.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking id
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
