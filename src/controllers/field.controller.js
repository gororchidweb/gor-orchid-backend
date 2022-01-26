const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fieldService } = require('../services');

const createField = catchAsync(async (req, res) => {
  const field = await fieldService.createField(req.body);
  res.status(httpStatus.CREATED).send(field);
});

const getFields = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fieldName']);
  const options = pick(req.query, ['sortyBy', 'limit', 'page']);
  const result = await fieldService.queryFields(filter, options);
  res.send(result);
});

const getField = catchAsync(async (req, res) => {
  const field = await fieldService.getFieldById(req.params.fieldId);
  if (!field) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Field not found');
  }
  res.send(field);
});

const updateField = catchAsync(async (req, res) => {
  const field = await fieldService.updateFieldById(req.params.fieldId, req.body);
  res.send(field);
});

const deleteField = catchAsync(async (req, res) => {
  await fieldService.deleteFieldById(req.params.fieldId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createField,
  getFields,
  getField,
  updateField,
  deleteField,
};
