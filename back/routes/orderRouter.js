const express = require('express');
const router = new express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders)
router.get('/', orderController.getAllOrderByUserId)
router.post('/', orderController.createOrder)

module.exports = router;