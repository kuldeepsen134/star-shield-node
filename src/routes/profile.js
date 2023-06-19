// const { multipleFileUploading, fileUploader } = require('../middleware/middleware')

const { profiles } = require('../controllers')

var router = require('express').Router()

module.exports = app => {

  router.post('/profiles', profiles.create)

  // router.get('/profiles', posts.findAll)

  // router.get('/posts/:id', posts.findOne)

  app.use('/api', router)
}