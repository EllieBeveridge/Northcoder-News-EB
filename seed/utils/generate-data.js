//const articles = require('../seed/testData/articles');
//const comments = require('../seed/testData/comments');
const topics = require('../testData/topics.json');
//const users = require('../seed/testData/users');
const { Article, Comment, Topic, User } = require('../../models');

const createTopics = (topics) => {
    return topics.map(topic => ({
        title: topic.title,
        slug: topic.slug
    }))
}

// const createArticle = (articles) => {

// }

module.exports = {createTopics};