const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const userRouter = require('./userRouter');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', userRouter)


module.exports = apiRouter;