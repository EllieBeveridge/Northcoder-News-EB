const mongoose = require('mongoose');
const articles = require('./testData/articles.json');
const comments = require('./testData/comments.json');
const users = require('./testData/users.json');
const topics = require('./testData/topics.json');
const { createTopics, createUsers, createComments, createArticles } = require('./utils/generate-data');
const {Article, Comment, Topic, User } = require('../models');


const seedDB = () => {
    return Topic.insertMany(createTopics(topics))
    .then(() => {
        return User.insertMany(createUsers(users))
    })
    // .then(() => {
    //     return createComments(comments)
    // })
    // .then((comments) => {
    //     return Comment.insertMany(comments)
    // })
    // .then(() => {
    //     console.log('in first part')
    //     return createArticles(articles)
    // })

    // .then((articles) => {
    //     console.log('hello')
    //     return Article.insertMany(createArticles(articles));
    // })
    .catch(console.log)
}

module.exports = seedDB;