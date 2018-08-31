const Article = require('../models/Article');
const Comment = require('../models/Comment')

const getAllArticles = (req, res, next) => {

    Comment.find().lean()
    .then((comments) => {
    return Promise.all([Article.find().lean(), comments])
    })
    .then(([articles, comments]) => {

       articles.forEach(article => {
        article.comment_count = 0
        comments.forEach(comment => {
          if (`${article._id}` === `${comment.belongs_to}`) {
            article.comment_count++
            }
          })
        })
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
        return Promise.all([Article.find({_id: article_id}).lean(),commentCount])
    })
        .then(([article, commentCount]) => {
            article[0].comment_count = commentCount;
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

    Comment.find({belongs_to: article_id})
    .then((comments) => {
        const commentCount = comments.length
        return commentCount
    })
    .then((commentCount) => {
        let x = 0;
    if (req.query.vote === 'up') x=1;
    else if (req.query.vote === 'down') x= -1;

      return Promise.all([Article.findByIdAndUpdate({_id: article_id}, {$inc: {votes: x}}, {new: true}).lean(), commentCount])
        .then(([article, commentCount]) => {
            article.comment_count = commentCount;
            res.status(201).send({article})
        })
    })
 
    .catch(console.log);
}



module.exports = { getAllArticles, getArticleByID, getCommentsByArticle, patchVoteCount }