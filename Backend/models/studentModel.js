const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: false
    },
    teacher_id: {
        type: Number,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    },
    device_id:{
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Student', studentSchema);