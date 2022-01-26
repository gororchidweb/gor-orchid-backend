const httpStatus = require('http-status');
const { Field } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} userBody
 * @returns {Promise<Field>}
 */
const createField = async (fieldBody) => {
  return Field.create(fieldBody);
};

/**
 * Query for fields
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFields = async (filter, options) => {
  const fields = await Field.paginate(filter, options);
  return fields;
};

/**
 * Get field by id
 * @param {ObjectId} id
 * @returns {Promise<Field>}
 */
const getFieldById = async (id) => {
  return Field.findById(id);
};

/**
 * Update field by id
 * @param {ObjectId} fieldId
 * @param {Object} updateBody
 * @returns {Promise<Field>}
 */
const updateFieldById = async (fieldId, updateBody) => {
  const field = await getFieldById(fieldId);
  if (!field) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Field not found');
  }
  Object.assign(field, updateBody);
  await field.save();
  return field;
};

/**
 * Delete field by id
 * @param {ObjectId} fieldId
 * @returns {Promise<Field>}
 */
const deleteFieldById = async (fieldId) => {
  const field = await getFieldById(fieldId);
  if (!field) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await field.remove();
  return field;
};

module.exports = {
  createField,
  queryFields,
  getFieldById,
  updateFieldById,
  deleteFieldById,
};
