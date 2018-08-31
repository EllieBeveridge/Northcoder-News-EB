const seedDB = require('./seed');
const mongoose = require('mongoose');

const testData = require('./devData/');

const {DB_URL} = require('../config') || process.env;

// const DB_URL ={
//     test: 'mongodb://localhost:27017/northcoder_news_test',
//     dev:  'mongodb://localhost:27017/northcoder_news'
// }

mongoose.connect(DB_URL, { useNewUrlParser : true })
    .then(() => {
        return seedDB(testData)
    })
    .then((data) => {
        console.log(data, '<<<<');
        mongoose.disconnect();
    })
    .catch(console.log);