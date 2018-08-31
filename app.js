const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter');
const bodyParser = require('body-parser');
//const {DB_URL} = require('./config') || process.env;
const DB_URL = 'mongodb://localhost:27017/northcoder_news';
const mongoose = require('mongoose');

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connected');
  });

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/api', apiRouter);


module.exports = app;