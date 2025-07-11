const express = require('express');
const router = new express.Router();
const basketController = require('../controllers/basketController');

router.get('/:id', basketController.getAllProductsFromBasket)
router.post('/:id', basketController.addProductToBasket)

module.exports = router;