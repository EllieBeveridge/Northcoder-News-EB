const app = require('../app')
const { expect } = require('chai')
const request = require('supertest')(app)
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const testData = require('../seed/testData');
const seedDB = require('../seed/seed');

describe('/api', () => {
    let articles, comments, topics, users;
    beforeEach(() => {
        return seedDB(testData)
            .then(docs => {
                [comments, articles, users, topics] = docs
            })
    })
    after(() => {
        return mongoose.disconnect();
    })
    describe('/topics', () => {
        it('GET returns a 200 and an array of topics', () => {
            return request.get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body.topics[0]).to.contain.keys('_id', 'title', 'slug', '__v');
                    expect(body.topics[0].title).to.equal(topics[0].title);
                    expect(body.topics).to.be.an('array');
                })
        })
        it('GET returns a 200 and an array of articles for a topic_slug', () => {
            return request.get('/api/topics/cats/articles')
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles[0]).to.contain.keys('votes', '_id', 'title', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
                    expect(body.articles[0].belongs_to).to.equal('cats');
                    expect(body.articles).to.be.an('array');
                })
        })
        it('POST returns a 201 and adds an article for a topic_slug', () => {
            return request.post('/api/topics/cats/articles')
                .send(
                    {
                        "title": "TEST ME",
                        "created_by": "butter_bridge",
                        "body": "This is a lovely test"
                    }
                )
                .expect(201)
                .then(({ body }) => {
                    expect(body.article.title).to.equal('TEST ME');
                    expect(body.article.belongs_to).to.equal('cats');
                    expect(body.article).to.contain.keys('votes', '_id', 'title', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
                })
        })
        it('GET /topics/:topic_id/articles error handles for 404 not found', () => {
            const noTopic = 'wenches'
            return request.get(`/api/topics/${noTopic}/articles`)
                .expect(404)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 404: Article not found.");
                })
        })
        it('GET /topics/:topic_id/articles error handles for 404 not found', () => {
            const badTopic = 'w2en5ch4es'
            return request.get(`/api/topics/${badTopic}/articles`)
                .expect(400)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 400: Bad topic request");
                })
        })
        it('POST /topics/:topic_id/articles error handles for 400 bad key request', () => {
            return request.post(`/api/topics/cats/articles`)
                .send({
                    "tootle": "TEST ME",
                    "scroted_by": "butter_bridge",
                    "bady": "This is a lovely test"
                })
                .expect(400)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 400: Bad key request.");
                })
        })
    })
    describe('/articles', () => {
        it('GET returns 200 and array of all articles', () => {
            const article_id = articles[0]._id
            return request.get('/api/articles')
                .expect(200)
                .then(({ body }) => {
                    expect(body.articles[0]).to.contain.keys('votes', '_id', 'title', 'body', 'comment_count', 'created_at', 'belongs_to', 'created_by', '__v');
                    expect(body.articles[0].body).to.equal(articles[0].body);
                    expect(body.articles).to.be.an('array');
                })
        })
        it('GET returns a 200 and one article for an input ID', () => {
            const article_id = articles[0]._id
            return request.get(`/api/articles/${article_id}`)
                .expect(200)
                .then(({ body }) => {
                    expect(body.article[0]).to.contain.keys('votes', '_id', 'title', 'body', 'comment_count', 'created_at', 'belongs_to', 'created_by', '__v');
                    expect(body.article[0]._id).to.equal(`${article_id}`)
                })
        })
        it('GET returns a 200 and an array of comments for an article_id', () => {
            const article_id = articles[0]._id
            return request.get(`/api/articles/${article_id}/comments`)
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments[0]).to.contain.keys('votes', '_id', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
                    expect(body.comments[0].body).to.equal(comments[0].body);
                    expect(body.comments).to.be.an('array');
                })
        })
        it('PATCH sends a 201 and updates the vote count if voting up', () => {
            const article_id = articles[0]._id
            return request.patch(`/api/articles/${article_id}?vote=up`)
                .expect(201)
                .then(({ body }) => {
                    expect(body.article.votes).to.equal(articles[0].votes + 1);
                    expect(body.article._id).to.equal(`${article_id}`);
                })
        })
        it('PATCH sends a 201 and updates the vote count if voting down', () => {
            const article_id = articles[0]._id
            return request.patch(`/api/articles/${article_id}?vote=down`)
                .expect(201)
                .then(({ body }) => {
                    expect(body.article.votes).to.equal(articles[0].votes - 1);
                    expect(body.article._id).to.equal(`${article_id}`);
                })

        })
        it('PATCH error handles for 400 bad request', () => {
            const badArticle = 'abc123'
            return request.patch(`/api/articles/${badArticle}?vote=down`)
                .expect(400)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 400: Bad ID Request.");
                })
        })
        it('PATCH error handles for 404 not found', () => {
            const noArticle = '5b896113787404464027lid3'
            return request.patch(`/api/articles/${noArticle}?vote=down`)
                .expect(404)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 404: Article not found.");
                })
        })
        it('GET /articles/:article_id error handles for 404 not found', () => {
            const noArticle = '5b896114787404464027iac3'
            return request.get(`/api/articles/${noArticle}`)
                .expect(404)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 404: Article not found.");
                })
        })
        it('GET /articles/:article_id error handles for 400 bad request', () => {
            const badArticle = 'abc123';
            return request.get(`/api/articles/${badArticle}`)
                .expect(400)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 400: Bad ID Request.");
                })
        })
        it('POST returns a 201 and adds a comment for an article_id', () => {
            const article_id = articles[0]._id
            const user_id = users[0]._id
            return request.post(`/api/articles/${article_id}/comments`)
                .send(
                    {
                        "body": "This is a lovely test",
                        "created_by": user_id
                    }
                )
                .expect(201)
                .then(({ body }) => {
                    expect(body.comment.belongs_to).to.equal(`${article_id}`);
                    expect(body.comment).to.contain.keys('votes', '_id', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
                })
        })
        it('POST /topics/:topic_id/articles error handles for 400 bad key request', () => {
            const article_id = articles[0]._id
            return request.post(`/api/articles/${article_id}/comments`)
                .send({
                    "bady": "This is a lovely test",
                    "scroted_by": "butter_bridge"
                })
                .expect(400)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 400: Bad key request.");
                })
        })
    })
    describe('/comments', () => {
        it('PATCH sends a 201 and updates the vote count if voting down', () => {
            const comment_id = comments[0]._id
            return request.patch(`/api/comments/${comment_id}?vote=up`)
                .expect(201)
                .then(({ body }) => {
                    expect(body.comment.votes).to.equal(comments[0].votes + 1);
                    expect(body.comment._id).to.eql(`${comment_id}`);
                })

        })
        it('PATCH sends a 201 and updates the vote count if voting down', () => {
            const comment_id = comments[0]._id
            return request.patch(`/api/comments/${comment_id}?vote=down`)
                .expect(201)
                .then(({ body }) => {
                    expect(body.comment.votes).to.equal(comments[0].votes - 1);
                    expect(body.comment._id).to.eql(`${comment_id}`);
                })

        })
        it('PATCH error handles for 400 bad request', () => {
            const badComment = 'abc123'
            return request.patch(`/api/comments/${badComment}?vote=down`)
                .expect(400)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 400: Bad request.");
                })
        })
        it('PATCH error handles for 404 not found', () => {
            const noComment = '5b896113787404464027bed3'
            return request.patch(`/api/comments/${noComment}?vote=down`)
                .expect(404)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 404: Comment not found.");
                })
        })
        it('DELETE sends a 200 and removes a comment by ID', () => {
            const comment_id = comments[0]._id
            return request.delete(`/api/comments/${comment_id}`)
                .expect(200)
                .then(({ body }) => {
                    expect(body.comment.ok).to.equal(1);
                })
        })
        it('DELETE sends a 404 and handles error', () => {
            const comment_id = '5b896113787404464027jkl6'
            return request.delete(`/api/comments/${comment_id}`)
                .expect(404)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 404: Comment not found.");
                })
        })

    })
    describe('/users', () => {
        it('GET returns user object when username input', () => {
            const usernameInput = users[0].username
            return request.get(`/api/users/${usernameInput}`)
                .expect(200)
                .then(({ body }) => {
                    expect(body.user.username).to.equal(usernameInput);
                    expect(body.user).to.contain.keys('name', 'username', 'avatar_url');
                })
        })
        it('GET /users/:username error handles for 404 not found', () => {
            const noUser = 'EllieConnors'
            return request.get(`/api/users/${noUser}`)
                .expect(404)
                .then(({ body }) => {
                    expect(typeof body).to.equal('object');
                    expect(body.msg).to.equal("Error 404: Not found.");
                })
        })
    })
})
