const express = require('express');
const router = new express.Router();

router.post('/regisration', async (req, res) => {})
router.post('/login', async (req, res) => {})
router.get('/auth', (req, res) => {
    res.json({message: '52'})
})


module.exports = router;