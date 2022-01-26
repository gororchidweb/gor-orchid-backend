const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
// const { tokenTypes } = require('../config/tokens');

const fieldSchema = mongoose.Schema(
  {
    fieldName: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String,
      enum: ['Regular', 'VIP'],
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    timeslots: {
      type: Array,
    },
    desc: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fieldSchema.plugin(toJSON);
fieldSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
