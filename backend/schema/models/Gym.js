const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'GymOwner'
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
    pictures: [
        {
            type: String
        }
    ],
    services: [
        {
            type: String
        }
    ],
    phoneNumber: {
        type: String,
        required: true
    },
    GSTNumber: {
        type: String,
        required: true
    },
    plans: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Plan',
            required: true
        }
    ],
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
    trainers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Trainer'
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
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
    notices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notice'
        }
    ],
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Gym', gymSchema)