const { Reply } = require("../models")
const { createReply } = require("../utils/common")
const { handleError, handleResponse } = require("../utils/helpers")

exports.create = async (req, res) => {
    const { error } = createReply.validate(req.body, { abortEarly: false })

    if (error) {
        return handleError(error, 400, res)
    }

    const { comment_id, message, video_id } = req.body

    let data = ({
        comment_id,
        message,
        user_id: req.user.id,
        user_name: req.user.first_name,
        video_id,
    })

    const newReply = new Reply(data);
    try {
        await newReply.save()
        const datad = { ...newReply._doc, }

        handleResponse(res, datad, 201)
    }

    catch (error) {
        res.status(400).send({ error: error.message })
    }
}

exports.findAll = async (req, res) => {
    await Reply.find().then(data => {
        handleResponse(res, data, 200)
    })
        .catch(err => {
            handleError(err.message, 400, data)
        })
}

exports.getReplyByComment = async (req, res) => {
    await Reply.find({ comment_id: req.params.comment_id }).then(data => {
        handleResponse(res, data, 200)
    })
        .catch(err => {
            handleError(err.message, 400, data)
        })
}