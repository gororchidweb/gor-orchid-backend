const express = require('express');
const authRoute = require('./auth.route');
const bookingRoute = require('./booking.route');
const userRoute = require('./user.route');
const fieldRoute = require('./field.route');
const paymentRoute = require('./payment.route');
const notificationRoute = require('./notification.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/fields',
    route: fieldRoute,
  },
  {
    path: '/bookings',
    route: bookingRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/notifications',
    route: notificationRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
