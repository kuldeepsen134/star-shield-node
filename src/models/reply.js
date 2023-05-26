const mongoose = require("mongoose")
const { Schema } = mongoose

const replySchema = Schema({

    message: {
        type: String,
    },
    comment_id: {
        type: String,
    },
    video_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    user_name: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Replies", replySchema)
