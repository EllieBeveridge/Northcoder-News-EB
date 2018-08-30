const Article = require('../models/Article');
const Comment = require('../models/Comment')

const getAllArticles = (req, res, next) => {
    Article.find()
    .then((articles) => {
        res.status(200).send({articles});
    })
    .catch(console.log);
}

const getArticleByID = (req, res, next) => {
    const {article_id} = req.params

    Article.find({_id: article_id})
    .then((article) => {
        res.status(200).send({article})
    })
}

const getCommentsByArticle = (req, res, next) => {
    const {article_id} = req.params

    Comment.find({belongs_to: article_id})
    .then((comments) => {
        res.status(200).send({comments})
    })
}

const patchVoteCount = (req, res, next) => {
    const {article_id} = req.params
    console.log(req.query);
    console.log(req.body.votes);

    if (req.query === 'up')

    Comment.update({belongs_to: article_id}, {$set: {req.body.votes: req.body.votes + 1 }})
    .then((comment) => {
        res.status(201).send({comment})
    })


}

module.exports = { getAllArticles, getArticleByID, getCommentsByArticle, patchVoteCount }