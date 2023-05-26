const { comments } = require('../controllers');

var router = require('express').Router()


module.exports = app => {

    router.post('/comments', comments.create)

    router.get('/comments', comments.findAll)

    router.get('/comments/:videoId', comments.getVideoComments)


    app.use('/api', router);
}