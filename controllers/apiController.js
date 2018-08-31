exports.getApis = (req, res, next) => {
    return contentString = `
    
    >GET /api
    Serves an HTML page with documentation for all the available endpoints (this page!)
    
    >GET /api/topics
    Get all the topics
    
    >GET /api/topics/:topic_slug/articles
    Return all the articles for a certain topic, e.g. '/api/topics/football/articles'
    
    >POST /api/topics/:topic_slug/articles
    Add a new article to a topic. This route requires a JSON body with title and body key value pairs
    E.g: '{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}'
    
    >GET /api/articles
    Returns all the articles.
    
    >GET /api/articles/:article_id
    Get an individual article
    
    >GET /api/articles/:article_id/comments</h1>
    Get all the comments for an individual article</p>
    
    >POST /api/articles/:article_id/comments</h1>
    Add a new comment to an article. This route requires a JSON body ***** with body and created_by key value pairs
    e.g: '{"body": "This is my new comment", "created_by": "user_id goes here"}'
    
    >PATCH /api/articles/:article_id
    Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
    e.g: '/api/articles/:article_id?vote=up'
    
    >PATCH /api/comments/:comment_id
    Incremement or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
    e.g: '/api/comments/:comment_id?vote=down'
    
    >DELETE /api/comments/:comment_id
    Deletes a comment by ID
    
    >GET /api/users/:username
    e.g: '/api/users/mitch123'
    Returns a JSON object with the profile data for the specified user.`

.then(string => {
    res.status(200).send({string})
})
}
