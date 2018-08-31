const config = require('../config');
const app = require('../app')
const {expect} = require('chai')
const request = require('supertest')(app)
const mongoose = require('mongoose');
const testData = require('../seed/testData');
const seedDB = require('../seed/seed');


//process.node.NODE_ENV = 'test';


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
            .then(({body}) => {
                expect(body.topics[0]).to.contain.keys('_id', 'title', 'slug', '__v');
                expect(body.topics).to.be.an('array');
            })
        })
        it('GET returns a 200 and an array of articles for a topic_slug', () => {
            return request.get('/api/topics/cats/articles')
            .expect(200)
            .then(({body}) => {
                expect(body.articles[0]).to.contain.keys('votes', '_id', 'title', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
                expect(body.articles).to.be.an('array');
            })
        })
        it('POST returns a 201 and adds an article for a topic_slug', () => {
            return request.post('/api/topics/cats/articles')
            .send(
                {
                    "votes": 80,
                    "title": "TEST ME",
                    "body": "It's nearly lunch",
                    "created_at": "2017-07-21T17:54:10.346Z",
                    "belongs_to": "cats",
                    "created_by": "butter_bridge"
                }
            )
            .expect(201)
            .then(({body}) => {
                expect(body.article.title).to.equal('TEST ME');
                expect(body.article).to.contain.keys('votes', '_id', 'title', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
            })
        })
    })
    describe('/articles', () => {
        it('GET returns 200 and array of all articles', () => {
            const article_id = articles[0]._id
            return request.get('/api/articles')
            .expect(200)
            .then(({body}) => {
                expect(body.articles[0]).to.contain.keys('votes', '_id', 'title', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
                expect(body.articles).to.be.an('array');
            })
        })
        it('GET returns a 200 and one article for an input ID', () => {
            const article_id = articles[0]._id
            return request.get(`/api/articles/${article_id}`)
            .expect(200)
            .then(({body}) => {
                expect(body.article[0]).to.contain.keys('votes', '_id', 'title', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
            })
        })
        it('GET returns a 200 and an array of comments for an article_id', () => {
            const article_id = articles[0]._id
            return request.get(`/api/articles/${article_id}/comments`)
            .expect(200)
            .then(({body}) => {
                expect(body.comments[0]).to.contain.keys('votes', '_id', 'body', 'created_at', 'belongs_to', 'created_by', '__v');
                expect(body.comments).to.be.an('array');
            })
        })
        it('PATCH sends a 201 and updates the vote count if voting up', () => {
            const article_id = articles[0]._id
            return request.patch(`/api/articles/${article_id}?vote=up`)
            .expect(201)
            .then(({body}) => {
                expect(body.article.votes).to.equal(1)
            })
        })
            it('PATCH sends a 201 and updates the vote count if voting down', () => {
                const article_id = articles[0]._id
                return request.patch(`/api/articles/${article_id}?vote=down`)
                .expect(201)
                .then(({body}) => {
                    expect(body.article.votes).to.equal(-1) // don't hard code responses, use articles etc
                })
        
        })
        describe('/api/comments', () => {
            it('PATCH sends a 201 and updates the vote count if voting down', () => {
                const comment_id = comments[0]._id
                return request.patch(`/api/comments/${comment_id}?vote=up`)
                .expect(201)
                .then(({body}) => {
                    expect(body.comment.votes).to.equal(8)
                })
        
        })
        it('PATCH sends a 201 and updates the vote count if voting down', () => {
            const comment_id = comments[0]._id
            return request.patch(`/api/comments/${comment_id}?vote=down`)
            .expect(201)
            .then(({body}) => {
                expect(body.comment.votes).to.equal(6)
            })
    
    })
    it('DELETE sends a 200 and removes a comment by ID', () => {
        const comment_id = comments[0]._id
        return request.delete(`/api/comments/${comment_id}`)
        .expect(200)
        .then(({body}) => {
            expect(body.comment.ok).to.equal(1);
            expect(comments.length).to.equal(8);
        })
      })
    })
    describe('/api/users', () => {
        it('GET returns user object when username input', () => {
            const usernameInput = users[0].username
            return request.get(`/api/users/${usernameInput}`)
            .expect(200)
            .then(({body}) => {
                expect(body.user.username).to.equal(usernameInput);
                expect(body.user).to.contain.keys('name', 'username', 'avatar_url');
            })
        })
    })
  })
})
