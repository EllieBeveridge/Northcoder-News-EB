const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');

apiRouter.route('/').get((req, res, next) => {
    res.render('apiTemplate');
})

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', userRouter)
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);


module.exports = apiRouter;