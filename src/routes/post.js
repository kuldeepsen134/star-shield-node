const { posts } = require('../controllers')
const { multipleFileUploading, fileUploader } = require('../middleware/middleware')

var router = require('express').Router()

module.exports = app => {

  router.post('/posts', fileUploader, posts.create)

  router.get('/posts', posts.findAll)

  router.get('/posts/:id', posts.findOne)

  app.use('/api', router)
}