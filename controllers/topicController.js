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

    console.log(topic_slug)
    Article.find({belongs_to: topic_slug})
    .then((articles) => {
        res.status(200).send({articles})
    })
}

module.exports = {getAllTopics, getArticlesByTopic}