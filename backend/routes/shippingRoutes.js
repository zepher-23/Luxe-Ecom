const express = require('express');
const router = express.Router();
const { getShippingRates } = require('../controllers/shippingController');

router.route('/').get(getShippingRates);

module.exports = router;
