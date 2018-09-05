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
        it('DELETE sends a 200 and removes a comment by ID', () => {
            const comment_id = comments[0]._id
            return request.delete(`/api/comments/${comment_id}`)
                .expect(200)
                .then(({ body }) => {
                    expect(body.comment.ok).to.equal(1);
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
    })
})
