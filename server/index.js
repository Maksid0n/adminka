const express = require('express');
const path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

// Credentials for development
// const credentials = require('../config');

// Database controller utility
// var dbcontroller = require('./db/dbcontroller');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"This is text from server-side API"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
