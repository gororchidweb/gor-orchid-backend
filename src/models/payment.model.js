const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
// const { tokenTypes } = require('../config/tokens');

const paymentSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phone: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    bookingId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Booking',
    },
    fieldId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Field',
    },
    transactionStatus: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'TIMEOUT', 'REDIRECT'],
    },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'UNPAID', 'RESERVED'],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
