const { posts } = require('../controllers')
const { multipleFileUploading, fileUploader } = require('../middleware/middleware')

var router = require('express').Router()

module.exports = app => {

  router.post('/posts',fileUploader, posts.create)
  router.get('/posts', posts.findAll)

  app.use('/api', router)
}