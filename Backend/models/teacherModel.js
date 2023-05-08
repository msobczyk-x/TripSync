const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    code: {
        type: Number,
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
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    }
    ,
    phone_number:{
        type: String,
        required: true
    },
    school:{
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

module.exports = mongoose.model('Teacher', teacherSchema);