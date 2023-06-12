const { Comment } = require("../models")
const { handleResponse, handleError } = require("../utils/helpers")


exports.create = async (req, res) => {
    // const { error } = createComment.validate(req.body, { abortEarly: false })

    // if (error) {
    //     return handleError(error, 400, res)
    // }

    const { message, post_id } = req.body

    let data = ({
        message,
        post_id,
        user_id: req.user._id,
        user_name: req.user.first_name + ' ' + req.user.last_name,
    })

    const newComment = new Comment(data)

    newComment.save().then(comment => {
        res.status(201).send({ ...comment._doc, error: false })
    }).catch(err => {
        res.status(400).send({ error: true, message: err.message })
    })

}



exports.findAll = async (req, res) => {
    await Comment.find().then(data => {
        handleResponse(res, data, 200)
    })
        .catch(err => {
            handleError(err.message, 400, data)
        })
}

exports.getCommentsById = async (req, res) => {

    const page = parseInt(req.query.page) || 1; // Get the page number from the query string
    const limit = parseInt(req.query.limit) || 5
  
    const totalCount = await Comment.countDocuments(); // Get the total count of documents in the collection
  
    const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages
  
    const skip = (page - 1) * limit; // 

    await Comment.find({ post_id:req.params.id}).skip(skip).limit(limit).then(data => {
        res.send({ data, currentPage: page, totalPages, totalCount, error: false })
    })
        .catch(err => {
            handleError(err.message, 400, data)
        })
}
