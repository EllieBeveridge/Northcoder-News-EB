const seedDB = require('./seed');
const mongoose = require('mongoose');
const articleData = require('./testData/articles.json');
const commentData = require('./testData/comments.json');
const userData = require('./testData/users.json');
const topicData = require('./testData/topics.json');
const DB_URL = 'mongodb://localhost:27017/northcoder_news';

// const DB_URL ={
//     test: 'mongodb://localhost:27017/northcoder_news_test',
//     dev:  'mongodb://localhost:27017/northcoder_news'
// }

mongoose.connect(DB_URL, { useNewUrlParser : true })
    .then(() => {
        return mongoose.connection.dropDatabase()
    })
    .then(() => {
        return seedDB(articleData, commentData, userData, topicData)
    })
    .then((data) => {
        //console.log(data, '<<<<');
        mongoose.disconnect();
    })
    .catch(console.log);