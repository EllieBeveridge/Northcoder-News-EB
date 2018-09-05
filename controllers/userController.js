const User = require('../models/User');


const getAllUsers = (req, res, next) => {
	User.find()
		.then((users) => {
			if (!users) Promise.reject(next);
			res.status(200).send({ users });
		})
		.catch(err => {
			if (err.name === 'CastError') next({ status: 404, msg: "Error 404: Not found." });
			else next(err)
		})
}

const getUsername = (req, res, next) => {
	User.findOne({ username: req.params.username })
		.then(user => {
			if (!user) Promise.reject(next);
			res.status(200).send({ user });
		})
		.catch(err => {
			if (err.name === 'CastError') next({ status: 404, msg: "Error 404: Not found." });
			else next(err)
		})
}

module.exports = { getAllUsers, getUsername }