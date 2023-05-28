const mongoose = require("mongoose")
const { Schema } = mongoose

const groupSchema = Schema({
    member_Id: {
        type: String,
    },
    admin_Id: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Group", groupSchema)
