const Comment = require('../models/Comment')

const getComments = (req, res, next) => {
	Comment.find().populate('created_by').lean()
		.then(comments => {
			if (!comments) throw { name: "CastError" }
			res.status(200).send({ comments })
		})
		.catch(err => {
			if (err.name === 'CastError') next({ status: 404, msg: "Error 404: Comments not found." });
			else next(err)
		})
}

const patchComments = (req, res, next) => {
	const { comment_id } = req.params;
	if (comment_id.length !== 24) return next({ status: 400, msg: "Error 400: Bad request." })
	let vote = 0;
	if (req.query.vote === 'up') vote++;
	else if (req.query.vote === 'down') vote--;

	Comment.findByIdAndUpdate({ _id: comment_id }, { $inc: { votes: vote } }, { new: true })
		.then((comment) => {
			if (!comment) throw { name: "CastError" }
			res.status(201).send({ comment })
		})
		.catch(err => {
			if (err.name === 'CastError') next({ status: 404, msg: "Error 404: Comment not found." });
			else next(err)
		})
}

const deleteComment = (req, res, next) => {
	if (req.params.comment_id.length !== 24) return next({ status: 400, msg: "Error 400: Bad request." })
	Comment.deleteOne(
		{ _id: req.params.comment_id }
	)
		.then(comment => {
			if (!comment) throw { name: "CastError" }
			res.status(200).send({ comment })
		})
		.catch(err => {
			if (err.name === 'CastError') next({ status: 404, msg: "Error 404: Comment not found." });
			else next(err)
		})
}

module.exports = { getComments, deleteComment, patchComments };