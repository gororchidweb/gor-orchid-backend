const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPayment = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.number().required(),
    userId: Joi.string().custom(objectId),
    fieldId: Joi.string().custom(objectId).required(),
    bookingId: Joi.string().custom(objectId).required(),
    transactionStatus: Joi.string().required().valid('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'TIMEOUT', 'REDIRECT'),
    paymentStatus: Joi.string().required().valid('PAID', 'UNPAID', 'RESERVED'),
  }),
};

const getPayments = {
  query: Joi.object().keys({
    amount: Joi.number(),
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.number(),
    userId: Joi.string(),
    fieldId: Joi.string(),
    bookingId: Joi.string(),
    transactionStatus: Joi.string().valid('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'TIMEOUT', 'REDIRECT'),
    paymentStatus: Joi.string().valid('PAID', 'UNPAID', 'RESERVED'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    sort: Joi.optional(),
    range: Joi.optional(),
    filter: Joi.optional(),
  }),
};

const getPayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId),
  }),
};

const updatePayment = {
  params: Joi.object().keys({
    paymentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      amount: Joi.number(),
      bookingId: Joi.string().custom(objectId),
      email: Joi.string().email(),
      fieldId: Joi.string().custom(objectId),
      name: Joi.string(),
      paymentStatus: Joi.string().required().valid('PAID', 'UNPAID', 'RESERVED'),
      phone: Joi.number(),
      transactionStatus: Joi.string().required().valid('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED', 'TIMEOUT', 'REDIRECT'),
      userId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deletePayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
};
