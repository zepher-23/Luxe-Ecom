const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;
