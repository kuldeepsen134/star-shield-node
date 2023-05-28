const { groups } = require('../controllers');

var router = require('express').Router()


module.exports = app => {

    router.post('/groups', groups.create)

    router.get('/groups', groups.findAll)

    // router.get('/replies/:comment_id', replies.getReplyByComment)


    app.use('/api', router);
}