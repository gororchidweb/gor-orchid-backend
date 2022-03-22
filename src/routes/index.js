const express = require('express');
const notificationRoute = require('./notification.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/notifications',
    route: notificationRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
