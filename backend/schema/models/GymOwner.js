const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gymOwnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    dateLastlogin: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('GymOwner', gymOwnerSchema)