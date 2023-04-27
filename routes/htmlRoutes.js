// require dependencies
const express = require('express');

const path = require('path');
const router = express.Router();

// router gets for notes.html
router.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../Develop/public/notes.html'));
});

// router gets for index.html
router.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../Develop/public/index.html'));
});

module.exports = router;