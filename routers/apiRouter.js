const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const {getApis} = require('../controllers/apiController');

apiRouter.get('/', getApis)

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', userRouter)
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);


module.exports = apiRouter;