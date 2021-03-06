const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
// const { tokenTypes } = require('../config/tokens');

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
      // required: true,
    },
    fieldId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Field',
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ['CONFIRMED', 'CANCELLED', 'RESERVED'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'UNPAID'],
      required: true,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
