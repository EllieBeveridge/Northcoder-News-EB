const topicsRouter = require('express').Router();
const {getAllTopics, getTopicBySlug} = require('../controllers/topicController');

topicsRouter.get('/', getAllTopics);

topicsRouter.get('/:topic_slug/articles', getTopicBySlug);

module.exports = topicsRouter;
