const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter');
const bodyParser = require('body-parser');
const { DB_URL = require('./config').DB_URL } = process.env;
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connected');
  });

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (err.status === 400) res.status(400).send('Error 400: Bad request');
  if (err.status === 404) res.status(404).send('Error 404: Page not found');
  else res.status(500).send('Error 500: Internal server error');
})


module.exports = app;