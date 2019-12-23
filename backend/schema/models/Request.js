const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reply: {
        type: String
    },
    validated: {
        type: Boolean,
        required: true
    },
    rejected: {
        type: Boolean,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Request', requestSchema)