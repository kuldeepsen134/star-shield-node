var router = require('express').Router()
const { users } = require('../controllers/index')

module.exports = app => {

  router.post('/register', users.register)
  
  router.get('/users', users.findAll)
  router.get('/users/:id', users.findOne)

  router.patch('/users/:id', users.updateOne)
  
  router.patch('/users/updateProfile', users.update)
  
  router.delete('/users/:id', users.delete)


  app.use('/api', router)
}