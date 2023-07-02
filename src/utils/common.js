const Joi = require('joi')

const registerUser = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
    contact: Joi.string(),
})

const updaterUserProfile = Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    password: Joi.string().min(8).max(32),
    contact: Joi.string(),
})



const login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),

})


const resetEmail = Joi.object().keys({
    email: Joi.string().email().required(),

})

const resendEmailLink = Joi.object().keys({
    email: Joi.string().email().required(),

})

//**************** Comments ****************/
const createComment = Joi.object().keys({
    title: Joi.string().required(),
    timeStamp: Joi.string().required(),
    message: Joi.string().required(),
    video_id: Joi.string().required(),
})

//**************** Reply ****************/
const createReply = Joi.object().keys({
    comment_id: Joi.string().required(),
    message: Joi.string().required(),
    video_id: Joi.string().required(),
})

const createGroup = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    member_IDs: Joi.array()
})

module.exports = {
    registerUser,
    updaterUserProfile,
    resendEmailLink,

    login,
    resetEmail,

    createComment,
    createReply,
}