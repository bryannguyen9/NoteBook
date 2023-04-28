// Import dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// Set up server
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static('./public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.promises
    .readFile('./db/db.json', 'utf-8')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqid('note-'),
    };

    fs.promises
      .readFile('./db/db.json', 'utf-8')
      .then((data) => {
        let parsedNotesData = JSON.parse(data);
        parsedNotesData.push(newNote);
        return fs.promises.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotesData, null, 2)
        );
      })
      .then(() => {
        res.send('new note creation successful');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json('An error has occurred');
      });
  } else {
    // Use res.status().send() instead of req.status().json()
    res.status(500).send('An error has occurred');
  }
});

app.delete('/api/notes/:id', (req, res) => {
  fs.promises
    .readFile('./db/db.json', 'utf-8')
    .then((data) => {
      let parsedNotesData = JSON.parse(data);
      // Use Array.filter() to remove the note with the specified ID
      parsedNotesData = parsedNotesData.filter(
        (note) => note.id !== req.params.id
      );
      return fs.promises.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotesData, null, 2)
      );
    })
    .then(() => {
      res.send('note deletion successful');
    })
    .catch((err) => {
      console.log(err);
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});