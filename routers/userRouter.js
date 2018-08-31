const userRouter = require('express').Router();
const {getAllUsers, getUsername} = require('../controllers/userController');

userRouter.get('/', getAllUsers)

userRouter.get('/:username', getUsername);


module.exports = userRouter;
