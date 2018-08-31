const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter');
const bodyParser = require('body-parser');
const {DB_URL = require('./config').DB_URL} = process.env;
const mongoose = require('mongoose');

console.log(DB_URL);

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connected');
  });

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/api', apiRouter);


module.exports = app;