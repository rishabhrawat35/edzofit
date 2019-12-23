const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    height: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    dateJoined: {
        type: String,
        required: true
    },
    dateLastLogin: {
        type: String,
        required: true
    },
    registerationFee: {
        type: Number,
        required: true
    },
    weight: {
        type: String
    },
    gender: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'Plan'
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym'
    },
    invoices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Invoice'
        }
    ],
    attendance: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Attendance'
        }
    ],
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer'
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    displayPicture: {
        type: String,
        required: true
    },
    planCycleStart: {
        type: String,
        required: true
    },
    requests: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Request'
        }
    ],
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ],
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)