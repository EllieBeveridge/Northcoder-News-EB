const Topic = require('../models/Topic');
const Article = require('../models/Article');
const User = require('../models/User');
const Comment = require('../models/Comment');

const getAllTopics = (req, res, next) => {
	Topic.find()
		.then((topics) => {
			if (!topics) return next({ status: 404, msg: "Error 404: Not found." })
			res.status(200).send({ topics });
		})
		.catch(err => {
			if (err.name === 'CastError') next({ status: 404, msg: "Error 404: Not found." });
			else next(err)
		})
}

const getArticlesByTopic = (req, res, next) => {
	const { topic_slug } = req.params
	if (/\d/g.test(topic_slug)) return next({ status: 400, msg: 'Error 400: Bad topic request' })
	Comment.find()
		.then((comments) => {
			if (!comments) throw { name: 'CastError' }
			return Promise.all([Article.find({ belongs_to: topic_slug })
				.populate('created_by')
				.lean(), comments])
		})
		.then(([articles, comments]) => {
			if (!articles || articles.length === 0) throw { name: 'CastError' }
			articles.forEach(article => {
				article.comment_count = 0
				comments.forEach(comment => {
					if (`${article._id}` === `${comment.belongs_to}`) {
						article.comment_count++
					}
				})
			})
			res.status(200).send({ articles })
		})
		.catch(err => {
			if (err.name === 'CastError') next({ status: 404, msg: "Error 404: Article not found." });
			else next(err)
		})
}

const addArticle = (req, res, next) => {
	userInputObj = req.body;
	if (!Object.keys(userInputObj).includes('title', 'created_by', 'body')) return next({ status: 400, msg: "Error 400: Bad key request." });
	User.findOne({ username: req.body.created_by }).lean()
		.then((userDoc) => {
			if (!userDoc) return next({ status: 404, msg: "Error 404: User not found." })
			console.log(userDoc)
			const userInput = req.body
			userInput.created_at = Date.now();
			userInput.created_by = userDoc._id;
			userInput.belongs_to = req.params.topic_slug
			const newArticle = new Article(userInput)
			newArticle.save()
				.then((article) => {
					if (!article) next({ status: 404, msg: "Error 404: Not found." })
					res.status(201).send({ article })
				})
				.catch(err => {
					if (err.name === 'CastError') next({ status: 404, msg: "Error 404: Not found." });
					else next(err)
				})
		})
}

module.exports = { getAllTopics, getArticlesByTopic, addArticle }