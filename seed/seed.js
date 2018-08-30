const mongoose = require('mongoose');
//const articleData = require('./testData/articles.json');
//const commentData = require('./testData/comments.json');
//const userData = require('./testData/users.json');
//const topicData = require('./testData/topics.json');
const { createTopics, createUsers, createComments, createArticles } = require('./utils/generate-data');
const {Article, Comment, Topic, User } = require('../models');


const seedDB = ({articleData, commentData, userData, topicData}) => {
        return mongoose.connection.dropDatabase()
        .then( () => {

        return Promise.all(
            [User.insertMany(createUsers(userData)),
            Topic.insertMany(createTopics(topicData))
            ])
        })
    .then(([userDocs, topicDocs]) => {
        return Promise.all(
            [Article.insertMany(createArticles(articleData, userData, userDocs)),
             userDocs, topicDocs])
    })
        .then(([articleDocs, userDocs, topicDocs]) => {
         return Promise.all([Comment.insertMany(createComments(commentData, userData, articleDocs, userDocs)),
            articleDocs, userDocs, topicDocs])
     })
     //[articles, comments, topics, users]
    .catch(console.log)
}


module.exports = seedDB;