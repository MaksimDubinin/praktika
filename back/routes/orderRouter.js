const express = require('express');
const router = new express.Router();
const orderController = require('../controllers/orderController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/admin', checkRoleMiddleware("ADMIN"), orderController.getAllOrders)
router.get('/', orderController.getAllOrderByUserId)
router.post('/', orderController.createOrder)

module.exports = router;