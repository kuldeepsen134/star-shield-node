const { replies } = require('../controllers')

var router = require('express').Router()


module.exports = app => {

    router.post('/replies', replies.create)

    router.get('/replies', replies.findAll)

    router.get('/replies/:comment_id', replies.getReplyByComment)


    app.use('/api', router);
}