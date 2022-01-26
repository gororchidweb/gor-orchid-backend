const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createField = {
  body: Joi.object().keys({
    fieldName: Joi.string().required(),
    fieldType: Joi.string().required().valid('Regular', 'VIP'),
    price: Joi.string().required(),
    timeslots: Joi.array().required(),
    desc: Joi.string().required(),
    imgUrl: Joi.string().required(),
  }),
};

const getFields = {
  query: Joi.object().keys({
    fieldName: Joi.string(),
    fieldType: Joi.string(),
    timeslots: Joi.array(),
    desc: Joi.string(),
    imgUrl: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getField = {
  params: Joi.object().keys({
    fieldId: Joi.string().custom(objectId),
  }),
};

const updateField = {
  params: Joi.object().keys({
    fieldId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      fieldName: Joi.string(),
      fieldType: Joi.string(),
      timeslots: Joi.array(),
      desc: Joi.string(),
      imgUrl: Joi.string(),
    })
    .min(1),
};

const deleteField = {
  params: Joi.object().keys({
    fieldId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createField,
  getFields,
  getField,
  updateField,
  deleteField,
};
