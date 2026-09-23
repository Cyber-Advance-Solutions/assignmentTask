// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const salesrepController = require('../controllers/salesrepController');
const optimalController = require('../controllers/optimalController');

// Define routes
router.get('/countries', countryController.getCountries);
router.get('/salesrep', salesrepController.getSalesReps);
router.get('/optimal', optimalController.getOptimalDistribution);

module.exports = router;
