const express = require('express');
const router = express.Router();


router.get('', (req, res) => {
    res.render('all')
})

router.get('/add', (req, res) => {
    res.render('add')
})

module.exports = router;