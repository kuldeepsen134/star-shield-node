const Joi = require('joi')

const registerUser = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
    role: Joi.string(),
})

const login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),

})

const resetEmail = Joi.object().keys({
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



module.exports = {
    registerUser,
    login,
    resetEmail,

    createComment,
    createReply,

}