// require dependencies
const express = require('express');
const router = express.Router();
const path = require('path');


// router gets for notes.html
router.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.htm'));
});

// router gets for index.html
router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;