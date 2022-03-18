const axios = require('axios');
const CryptoJS = require('crypto-js');
const uuid = require('uuid');
const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a payment
 * @param {Object} paymentBody
 * @returns {Promise<Payment>}
 */
function generateSignature(jsonBody, { requestId, requestTimestamp, secretKey, clientId }) {
  const digestSHA256 = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(jsonBody));
  const digestBase64 = CryptoJS.enc.Base64.stringify(digestSHA256);
  console.log(`Digest Component: ${JSON.stringify(jsonBody, null, 2)}`);
  console.log(`Digest sha256: ${digestSHA256}`);
  console.log(`Digest: ${digestBase64}`);
  const signatureComponents =
    `Client-Id:${clientId}\n` +
    `Request-Id:${requestId}\n` +
    `Request-Timestamp:${requestTimestamp}\n` +
    `Request-Target:/checkout/v1/payment` +
    `\n` +
    `Digest:${digestBase64}`;
  const signatureHmacSha256 = CryptoJS.HmacSHA256(signatureComponents, secretKey);
  const signatureBase64 = CryptoJS.enc.Base64.stringify(signatureHmacSha256);
  console.log(`Signature Components: ${signatureComponents}`);
  console.log(`Signature HMACSHA256: ${signatureHmacSha256}`);
  console.log(`Signature: ${signatureBase64}`);
  return `HMACSHA256=${signatureBase64}`;

  // const bodySha256 = CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(jsonBody)));
  // const signatureComponents =
  //   `Client-Id:${clientId}\n` +
  //   `Request-Id:${requestId}\n` +
  //   `Request-Timestamp:${requestId}\n` +
  //   `Request-Target:/checkout/v1/payment${+'Digest:'}${bodySha256}`;
  // const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(signatureComponents, secretKey));

  // return `HMACSHA256=${signature}`;
  // return signatureBase64;
}
const createPayment = async (paymentBody) => {
  const requestId = uuid.v4();
  const requestTimestamp = `${new Date().toISOString().slice(0, 19)}Z`;
  const url = process.env.PAYMENT_GATEWAY;
  const secretKey = process.env.PAYMENT_GATEWAY_SECRET_KEY;
  const clientId = process.env.PAYMENT_GATEWAY_CLIENT_ID;

  const paymentData = JSON.stringify({
    order: {
      amount: paymentBody.amount,
      invoice_number: paymentBody.bookingId,
    },
    payment: {
      payment_due_date: 60,
    },
  });

  const mockData = JSON.stringify({
    order: {
      amount: 20000,
      invoice_number: 'INV-20210231-0001',
    },
    payment: {
      payment_due_date: 60,
    },
  });
  const signature = await generateSignature(paymentData, {
    requestId,
    requestTimestamp,
    url,
    secretKey,
    clientId,
  });
  const config = {
    method: 'post',
    url,
    headers: {
      'Client-Id': clientId,
      'Request-Id': requestId,
      'Request-Timestamp': requestTimestamp,
      'Request-Target': '/checkout/v1/payment',
      Signature: signature,
      'Content-Type': 'application/json',
    },
    data: paymentData,
  };
  try {
    // const resp = await axios.get('https://swapi.dev/api/people/1/');
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log('paymentGatewayError', error.message);
  }


};

/**
 * Query for payments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
 * @returns {Promise<QueryResult>}
 */
const queryPayments = async (filter, options) => {
  const payments = await Payment.paginate(filter, options);
  return payments;
};

/**
 * Get payment by id
 * @param {ObjectId} id
 * @returns {Promise<Payment>}
 */
const getPaymentById = async (id) => {
  return Payment.findById(id);
};

/**
 * Update payment by id
 * @param {ObjectId} paymentId
 * @param {Object} updateBody
 * @returns {Promise<Payment>}
 */
const updatePaymentById = async (paymentId, updateBody) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  Object.assign(payment, updateBody);
  await payment.save();
  return payment;
};

/**
 * Delete payment by id
 * @param {ObjectId} paymentId
 * @returns {Promise<Payment>}
 */
const deletePaymentById = async (paymentId) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  await payment.remove();
  return payment;
};

module.exports = {
  createPayment,
  queryPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
