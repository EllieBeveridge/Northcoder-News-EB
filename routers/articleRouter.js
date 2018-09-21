const articleRouter = require('express').Router();
const { getAllArticles, getArticleByID, getCommentsByArticle, addComment, patchVoteCount } = require('../controllers/articleController');

articleRouter.get('/', getAllArticles);

articleRouter.route('/:article_id')
  .get(getArticleByID)
  .patch(patchVoteCount);

articleRouter.route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(addComment)



module.exports = articleRouter;
