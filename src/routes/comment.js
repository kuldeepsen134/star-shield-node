const { comments } = require('../controllers');

var router = require('express').Router()


module.exports = app => {

    router.post('/comments', comments.create)

    router.get('/comments', comments.findAll)

    router.get('/get-comments/:id', comments.getCommentsById)




    app.use('/api', router);
}