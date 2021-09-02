'use strict';

const express = require('express');
const { checkIfAuthenticated } = require('./services/firebase-service');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.get('/api/verify-token', checkIfAuthenticated, (req, res) => {
  res.send({data: 'this is my data'});
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);