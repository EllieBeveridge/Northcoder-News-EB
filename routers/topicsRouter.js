const topicsRouter = require('express').Router();
const {getAllTopics, getArticlesByTopic, addArticle} = require('../controllers/topicController');

topicsRouter.get('/', getAllTopics);

topicsRouter.route('/:topic_slug/articles')
.get(getArticlesByTopic)
.post(addArticle);

module.exports = topicsRouter;
