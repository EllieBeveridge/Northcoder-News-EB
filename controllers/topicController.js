const Topic = require('../models/Topic');
const Article = require('../models/Article');

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
    const newArticle = new Article(req.body);
    newArticle.save()
    .then((article) => {
        res.status(201).send({article})
    })
}

module.exports = {getAllTopics, getArticlesByTopic, addArticle}