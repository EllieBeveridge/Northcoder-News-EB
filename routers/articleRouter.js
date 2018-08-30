const articleRouter = require('express').Router();
const {getAllArticles, getArticleByID, getCommentsByArticle} = require('../controllers/articleController');

articleRouter.get('/', getAllArticles);

articleRouter.get('/:article_id', getArticleByID)

articleRouter.route('/:article_id/comments')
.get(getCommentsByArticle)
//.put(patchVoteCount);


module.exports = articleRouter;
