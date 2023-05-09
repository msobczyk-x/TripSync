import mongoose from 'mongoose';
import {customAlphabet, nanoid} from 'nanoid';
const nano = customAlphabet('1234567890', 6);

const schoolTripSchema = new mongoose.Schema({
  
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    students_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    }],
    trip_name:{
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: false
    },
    trip_status:{
        type: String,
        required: true,
        enum: ["preparation", "in_progress", "finished"],
        default: "preparation"
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

    trip_description:{
        type: String,
        required: true,
        maxLength: 500
    },


    });

    schoolTripSchema.pre('save', async function (next) {

        const randomCode = nano(6);
        do {
            const checkCode = await mongoose.model('SchoolTrip', schoolTripSchema).findOne({code: randomCode});
            if (checkCode) {
                randomCode = nano(6);
            }
            else {
                this.code = randomCode;
                break;
            }
        } while (true);
    
      });

export default mongoose.model('SchoolTrip', schoolTripSchema);
