const { groups } = require('../controllers');
var router = require('express').Router()


module.exports = app => {
    
    router.post('/followers', groups.create)

    router.get('/followers', groups.findAll)
    router.get('/get-followers', groups.getFOllower)

    router.get('/followers/:id', groups.findOne)


    app.use('/api', router);
}