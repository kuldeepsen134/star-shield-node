var router = require('express').Router()
const { users } = require('../controllers/index')

module.exports = app => {

  router.post('/register', users.register)
  
  router.get('/users', users.findAll)
  router.get('/users/:id', users.findOne)

  
  router.patch('/users/updateProfile', users.update)


  app.use('/api', router)
}