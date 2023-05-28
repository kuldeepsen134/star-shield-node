const mongoose = require("mongoose")
const { Schema } = mongoose

const groupSchema = Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    member_IDs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],

    admin_Id: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Group", groupSchema)
