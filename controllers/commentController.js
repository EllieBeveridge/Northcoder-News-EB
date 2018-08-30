const Comment = require('../models/Comment')

const getComments = (req, res, next) => {
    Comment.find()
    .then(comments => {
        res.status(200).send({comments})
    })
    .catch(console.log);
}

const patchComments = (req, res, next) => {
    const {comment_id} = req.params;
let x = 0;
    if (req.query.vote === 'up') x=1;
    else if (req.query.vote === 'down') x= -1;

        Comment.findByIdAndUpdate({_id: comment_id}, {$inc: {votes: x}}, {new: true})
        .then((comment) => {
            res.status(201).send({comment})
        })
 
    .catch(console.log);
}

const deleteComment = (req, res, next) => {
    Comment.deleteOne(
        {_id: req.params.comment_id}
    )
    .then(comment => {
        res.status(200).send({comment})
    })
    .catch(console.log);
}

module.exports = {getComments, deleteComment, patchComments};