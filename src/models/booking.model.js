const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
// const { tokenTypes } = require('../config/tokens');

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
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
