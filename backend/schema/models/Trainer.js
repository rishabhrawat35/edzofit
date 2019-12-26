const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trainerSchema = new Schema({
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
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

module.exports = mongoose.model('Trainer', trainerSchema)