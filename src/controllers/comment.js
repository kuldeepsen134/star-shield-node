const { Comment } = require("../models")
const { handleResponse, handleError } = require("../utils/helpers")


exports.create = async (req, res) => {
    // const { error } = createComment.validate(req.body, { abortEarly: false })

    // if (error) {
    //     return handleError(error, 400, res)
    // }

    const { title, timeStamp, message, post_id } = req.body

    let data = ({
        title,
        message,
        timeStamp,
        user_id: req.user._id,
        user_name: req.user.first_name,
        post_id,
    })

    const newComment = new Comment(data)

    newComment.save().then(comment => {
        res.status(201).send({ ...comment._doc, error:false })
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

