const Topic = require('../models/Topic');

const getAllTopics = (req, res, next) => {
    Topic.find()
    .then((topics) => {
        res.status(200).send({topics});
    })
    .catch(console.log);
}

const getTopicBySlug = (req, res, next) => {
    Topic.find({slug: topic_slug})
    .then((topic) => {
        res.status(200).send({topic})
    })
}

module.exports = {getAllTopics, getTopicBySlug}