const shippingRates = require('../data/shippingRates');

const getShippingRates = (req, res) => {
    res.json(shippingRates);
};

module.exports = { getShippingRates };
