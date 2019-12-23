const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
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
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

module.exports = mongoose.model('Notifiaction', notificationSchema)