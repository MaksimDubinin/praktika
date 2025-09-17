const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/registration', userController.registration)
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check)
router.post('/logout', userController.logout)

module.exports = router;