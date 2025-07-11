const express = require('express');
const router = new express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)
router.post('/', productController.createProduct)
router.post('/:id', productController.sendReview)


module.exports = router;