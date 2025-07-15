const express = require('express');
const router = new express.Router();
const productController = require('../controllers/productController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)
router.post('/', checkRoleMiddleware("ADMIN"), productController.createProduct)
router.post('/:id', productController.sendReview)


module.exports = router;