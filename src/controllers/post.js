const { Post } = require("../models")
const { handleError } = require("../utils/helpers")

exports.create = (req, res) => {
  const files = [];
  const { message } = req.body;

  req.files.map((item) => {
    files.push({
      originalName: item.originalname,
      mimetype: item.mimetype,
      fileName: item.filename, // Changed "filename" to "fileName"
      filePath: item.path,
      size: item.size,
    });
  });

  const post = new Post({
    message,
    files: files,
    creater_Id: req.user._id,
    userName: req.user.first_name + ' ' + req.user.last_name,
  });

  post
    .save()
    .then((savedPost) => {
      res.status(201).send(savedPost);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: 'Failed to create post' });
    });
};

exports.findAll = async (req, res) => {

  const page = parseInt(req.query.page) || 1; // Get the page number from the query string
  const limit = parseInt(req.query.limit) || 5

  const totalCount = await Post.countDocuments(); // Get the total count of documents in the collection

  const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages

  const skip = (page - 1) * limit; // 

  await Post.find().skip(skip).limit(limit).sort({ createdAt: -1 }).then(data => {
    res.send({ data, currentPage: page, totalPages, totalCount, error: false })
  })
    .catch(err => {
      handleError(err, 400, res)
    });

}