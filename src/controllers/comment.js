const { Comment, VideoCollection, CourceVideo, Cource, User } = require("../models")
const { createComment } = require("../utils/common")
const { handleError, handleResponse, sendMailer } = require('../utils/helpers')

exports.create = async (req, res) => {
    const { error } = createComment.validate(req.body, { abortEarly: false })

    if (error) {
        return handleError(error, 400, res)
    }

    const { title, timeStamp, message, video_id } = req.body

    let data = ({
        title,
        timeStamp,
        message,
        user_id: req.user.id,
        user_name: req.user.first_name,
        video_id,
    })
    const vid = video_id 

    const newComment = new Comment(data)
    try {   
        const CourceVideoDetails = await CourceVideo.findOne({_id:vid})
        
        if(vid == CourceVideoDetails._id){

            await newComment.save()
            const datad = { ...newComment._doc, }
        
            const cource_id =  CourceVideoDetails.cource_id;
            const CourceDetails = await Cource.findOne({cource_id:cource_id})
    
            const faculty_id = CourceDetails.faculty_id 
            const FacultyDetails = await User.findOne({faculty_id:faculty_id})
    
            const facultyEmail = FacultyDetails.email

            sendMailer(facultyEmail,title,`Student: ${req.user.first_name} have a problem at Time Stamp: ${timeStamp} - Message: ${message}`,res)

            handleResponse(res, datad, 201)

        }
        else{
            res.status(404).send({ error: 'video does not exixt' })
        }
    }

    catch (error) {
        res.status(400).send({ error: error.message })
    }
}

exports.findAll = async (req, res) => {
    await Comment.find().then(data => {
        handleResponse(res, data, 200)
    })
        .catch(err => {
            handleError(err.message, 400, data)
        })
}


exports.getVideoComments = async (req, res) => {
    await Comment.find({ video_id: req.params.videoId })
        .then(data => {
            handleResponse(res, data, 200)
        })
        .catch(err => {
            handleError(err.message, 400, data)
        })
}