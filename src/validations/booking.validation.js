const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBooking = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    fieldId: Joi.string().custom(objectId).required(),
    bookingDate: Joi.string().required(),
    bookingStatus: Joi.string().required().valid('CONFIRMED', 'CANCELLED', 'RESERVED'),
    paymentStatus: Joi.string().required().valid('PAID', 'UNPAID', 'RESERVED'),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  }),
};

const getBookings = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    fieldId: Joi.string().custom(objectId),
    bookingDate: Joi.string(),
    bookingStatus: Joi.string().valid('CONFIRMED', 'CANCELLED', 'RESERVED'),
    paymentStatus: Joi.string().valid('PAID', 'UNPAID', 'RESERVED'),
    startTime: Joi.string(),
    endTime: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
};

const updateBooking = {
  params: Joi.object().keys({
    bookingId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId).required(),
      fieldId: Joi.string().custom(objectId).required(),
      bookingDate: Joi.string().required(),
      bookingStatus: Joi.string().required().valid('CONFIRMED', 'CANCELLED', 'RESERVED'),
      paymentStatus: Joi.string().required().valid('PAID', 'UNPAID', 'RESERVED'),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
    })
    .min(1),
};

const deleteBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
