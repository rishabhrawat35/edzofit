const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendanceSchema = new Schema({
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
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Attendance', attendanceSchema)