const Topic = require('../models/Topic');
const Article = require('../models/Article');
const User = require('../models/User');

const getAllTopics = (req, res, next) => {
    Topic.find()
    .then((topics) => {
        res.status(200).send({topics});
    })
    .catch(console.log);
}

const getArticlesByTopic = (req, res, next) => {
    const {topic_slug} = req.params

    Article.find({belongs_to: topic_slug})
    .then((articles) => {
        res.status(200).send({articles})
    })
}

const addArticle = (req, res, next) => {
        User.findOne({username: req.body.created_by}).lean()
    .then((userDoc) => {
        const newArticle = req.body
        newArticle.created_at = Date.now();
        //newArticle.votes = 0;
        newArticle.created_by = userDoc._id;
        newArticle.belongs_to = req.params.topic_slug
        const newNewArticle = new Article(newArticle);
        return Promise.all([newNewArticle.save(), userDoc])
    })
    .then(([article, userDoc]) => {
        res.status(201).send({article})
    })
}

module.exports = {getAllTopics, getArticlesByTopic, addArticle}