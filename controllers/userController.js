const User = require('../models/User');


const getAllUsers = (req, res, next) => {
     User.find()
    .then((users) => {
        res.status(200).send({users});
    })
    .catch(console.log);
}

module.exports = {getAllUsers}