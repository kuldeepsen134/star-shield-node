const mongoose = require("mongoose")
const { Schema } = mongoose

const groupSchema = Schema({
    member_IDs: [
        {
            type: String,
        }
    ],
    admin_Id: {
        type: String,
    },
    
    status: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Group", groupSchema)