const userRouter = require('express').Router();
const {getUsername} = require('../controllers/userController');

userRouter.get('/:username', getUsername);


module.exports = userRouter;
