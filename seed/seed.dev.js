const seedDB = require('./seed');
const mongoose = require('mongoose');
const devData = require('./devData/');
const { DB_URL } = require('../config');

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        return seedDB(devData)
    })
    .then((data) => {
        console.log(data, '<<<<');
        mongoose.disconnect();
    })
    .catch(console.log);