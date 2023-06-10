const { groups } = require('../controllers');

var router = require('express').Router()


module.exports = app => {

    router.post('/followers', groups.create)

    router.get('/followers', groups.findAll)

    // router.get('/replies/:comment_id', replies.getReplyByComment)


    app.use('/api', router);
}