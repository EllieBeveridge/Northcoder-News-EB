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

    Comment.find({belongs_to: article_id})
    .then((comments) => {
        const commentCount = comments.length
        return commentCount
    })
    .then((commentCount) => {
        //do a Promise.all with commentCount and Article.find
        //console.log(commentCount);
        Article.find({_id: article_id}, {$set: {comment_count: 0}})
    
  .populate('comment_count', commentCount )
})
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(console.log);
}

const getCommentsByArticle = (req, res, next) => {
    const {article_id} = req.params

    Comment.find({belongs_to: article_id})
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch(console.log);
}

const patchVoteCount = (req, res, next) => {
    const {article_id} = req.params;
let x = 0;
    if (req.query.vote === 'up') x=1;
    else if (req.query.vote === 'down') x= -1;

        Article.findByIdAndUpdate({_id: article_id}, {$inc: {votes: x}}, {new: true})
        .then((article) => {
            res.status(201).send({article})
        })
 
    .catch(console.log);
}

const addCommentCount = (req, res, next) => {
    Article.update({},
        { $set: {"comment_count": x}},
        false,
        true)
}


module.exports = { getAllArticles, getArticleByID, getCommentsByArticle, patchVoteCount }