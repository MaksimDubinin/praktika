const express = require('express');
const router = new express.Router();
const basketController = require('../controllers/basketController');

router.get('/', basketController.getAllProductsFromBasket)
router.post('/', basketController.addProductToBasket)
router.post('/delete', basketController.deleteFromBasket)

module.exports = router;