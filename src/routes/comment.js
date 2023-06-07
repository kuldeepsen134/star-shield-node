const { comments } = require('../controllers');

var router = require('express').Router()


module.exports = app => {

    router.post('/comments', comments.create)

    router.get('/comments', comments.findAll)



    app.use('/api', router);
}