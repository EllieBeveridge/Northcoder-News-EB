const articles = require('../testData/articles.json');
const comments = require('../testData/comments.json');
const topics = require('../testData/topics.json');
const users = require('../testData/users.json');
const { Article, Comment, Topic, User } = require('../../models');

const createTopics = (topics) => {
    return topics.map(topic => ({
        title: topic.title,
        slug: topic.slug
    }))
}

const createUsers = (users) => {
    return users.map(user => ({
        username: user.username,
        name: user.name,
        avatar_url: user.avatar_url
    }))
}

const createComments = (comments) => {
    return comments.map(comment => ({
        body: comment.body,
        votes: comment.votes,
        created_at: comment.created_at
        // belongs_to: ?,
        // create_by: ?
    }))
}
//CONTINUE GENERATE DATA PAGE.

 const createArticles = (articles) => {


    return Promise.all( [User.find({}, ['username']), Topic.find({}, ['slug'])
    .then(([userArray, topicArray]) => {
        const createdByPairs = {}

        userArray.forEach((newID, i) => createdByPairs[users[i].username] = newID._id)

        const belongsToPairs = {}

        topicArray.forEach((newID, i) => belongsToPairs[topics[i].slug] = newID._id)
    

    console.log('is it hitting this at all')
        return articles.map(article => ({
            title: article.title,
            body: article.body,
            votes: article.vote,
            created_at: article.created_at,
            topic: article.topic,
             belongs_to: belongsToPairs[article.topic],
             created_by: createdByPairs[article.created_by]
        }))
    })
}


module.exports = {createTopics, createUsers, createComments, createArticles};