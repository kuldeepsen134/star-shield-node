const mongoose = require("mongoose")
const { Schema } = mongoose

const commentSchema = Schema({

    title: {
        type: String,
    },
    timeStamp: {
        type: String,
    },
    message: {
        type: String,
    },
    timestamps: {
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


module.exports = mongoose.model("Comments", commentSchema)
