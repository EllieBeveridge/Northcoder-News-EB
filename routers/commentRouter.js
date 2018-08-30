const commentRouter = require('express').Router();
const {getComments, deleteComment, patchComments} = require('../controllers/commentController');

commentRouter.get('/', getComments);

commentRouter.route('/:comment_id')
.delete(deleteComment)
.patch(patchComments)


module.exports = commentRouter;
