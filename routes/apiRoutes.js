// require dependencies
const express = require('express');
const router = express.Router();

// uuid is for rand id generation
const uuid = require('uuid');

// import db.js class
const dbImport = require('..db/db.js');

// router to get notes
router.get('/api/notes', async function(req, res) {
    const notes = await dbImport.read();
    return res.json(notes);
});

// router to post new note and add to json file
router.post('/api/notes', async function (req, res) {
    const currNotes = await dbImport.read();
    let newNote = {
        id: uuid(),
    title: req.body.title,
    text: req.body.text,
    };

    await dbImport.addNote([...currNotes, newNote]);

    return res.send(newNote);
});

module.exports = router;

