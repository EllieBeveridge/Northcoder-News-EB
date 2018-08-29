const topicsRouter = require('express').Router();
const {getAllTopics, getArticlesByTopic} = require('../controllers/topicController');

topicsRouter.get('/', getAllTopics);

topicsRouter.get('/:topic_slug/articles', getArticlesByTopic);

module.exports = topicsRouter;
