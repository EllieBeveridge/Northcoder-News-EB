const { Article, Comment, Topic, User } = require('../../models');

const createTopics = (topicData) => {
	return topicData.map(topic => ({
		title: topic.title,
		slug: topic.slug
	}))
}

const createUsers = (userData) => {
	return userData.map(user => ({
		username: user.username,
		name: user.name,
		avatar_url: user.avatar_url
	}))
}


const createArticles = (articleData, userData, userDocs) => {

	const createdByPairs = {}

	userDocs.forEach((newID, i) => createdByPairs[userData[i].username] = newID._id)

	return articleData.map(article => {
		return {
			title: article.title,
			body: article.body,
			votes: article.vote,
			created_at: article.created_at,
			belongs_to: article.topic,
			created_by: createdByPairs[article.created_by]
		}
	})
}

const createComments = (commentData, userData, articleDocs, userDocs) => {

	const createdByPairs = {}

	userDocs.forEach((newID, i) => createdByPairs[userData[i].username] = newID._id)

	const belongsToPairs = {}


	articleDocs.forEach((newID, i) => belongsToPairs[articleDocs[i].title] = newID._id)

	return commentData.map(comment => ({
		body: comment.body,
		votes: comment.votes,
		created_at: comment.created_at,
		belongs_to: belongsToPairs[comment.belongs_to],
		created_by: createdByPairs[comment.created_by]
	}))
}


module.exports = { createTopics, createUsers, createComments, createArticles };