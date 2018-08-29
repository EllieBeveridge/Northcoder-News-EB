const seedDB = require('./seed');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/northcoder_news';

mongoose.connect(DB_URL, { useNewUrlParser : true })
    .then(() => {
        return mongoose.connection.dropDatabase()
    })
    .then(() => {
        return seedDB()
    })
    .then((data) => {
        console.log(data, '<<<<');
        mongoose.disconnect();
    })
    .catch(console.log);