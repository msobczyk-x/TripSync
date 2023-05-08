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

const studentSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
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
    }
    ,
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

const schoolTripSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    teacher_id: {
        type: Number,
        required: true
    },
    students_id: {
        type: Array,
        required: true
    },
    start_date:{
        type: Date,
        required: true
    },
    end_date:{
        type: Date,
        required: true
    },
    start_location:{
        type: String,
        required: true
    },
    end_location:{
        type: String,
        required: true
    },
    trip_name:{
        type: String,
        required: true
    },
    trip_description:{
        type: String,
        required: true
    },
    trip_status:{
        type: String,
        required: true
    },
    });

module.exports = mongoose.model('Teacher', teacherSchema);
module.exports = mongoose.model('Student', studentSchema);
module.exports = mongoose.model('SchoolTrip', schoolTripSchema);