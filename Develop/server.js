// require dependencies
const express = require('express');
// might need fs, util, read and write rquires here

// initalize express
const app = express();

// create port
const PORT = 3001;

// Middleware for parsing JSON data
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// import routes for getting and posting data
const apiRoutes = require('../routes/apiRoutes.js');
app.use(apiRoutes);
const htmlRoutes = require('../routes/htmlRoutes.js');
app.use(htmlRoutes);

// server listener for connections
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));