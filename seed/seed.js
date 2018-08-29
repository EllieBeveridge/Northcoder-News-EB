const mongoose = require('mongoose');
//const articles = require('./testData/articles');
const topics = require('./testData/topics.json');
const { createTopics } = require('./utils/generate-data');
const Topic = require('../models/Topic');


const seedDB = () => {
    return Topic.insertMany(createTopics(topics))
    .catch(console.log);
}

module.exports = seedDB;