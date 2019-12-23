const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref:'Gym',
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref:'User',
        }
    ],
    dateStarted: {
        type: String,
        required: true
    },
    dateEnding: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Plan', planSchema)