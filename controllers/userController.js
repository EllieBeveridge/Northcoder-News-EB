const User = require('../models/User');


const getAllUsers = (req, res, next) => {
     User.find()
    .then((users) => {
        res.status(200).send({users});
    })
    .catch(err => next(err));
}

const getUsername = (req, res, next) => {
    User.findOne({username: req.params.username})
    .then(user => {
        res.status(200).send({user});
    })
    .catch(err => next(err));
}

module.exports = {getAllUsers, getUsername}