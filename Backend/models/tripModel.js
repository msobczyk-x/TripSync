import mongoose from 'mongoose';


const schoolTripSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    students_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    }],
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

export default mongoose.model('SchoolTrip', schoolTripSchema);
