import mongoose from 'mongoose';
import {customAlphabet, nanoid} from 'nanoid';
import {studentSchema} from './studentModel.js';
import {teacherSchema} from './teacherModel.js';
const nano = customAlphabet('1234567890', 6);

export const schoolTripSchema = new mongoose.Schema({
  
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
    code: {
        type: Number,
        required: false 
    },
    trip_schedule: [{
        date: {
            type: Date,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],

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
        
        const Student = mongoose.model('Student', studentSchema);

        for (let i = 0; i < this.students_id.length; i++) {
          const student = await Student.findById(this.students_id[i]);
          student.trips.push(this._id);
          await student.save();
        }

        const Teacher = mongoose.model('Teacher', teacherSchema);

const teacher = await Teacher.findById(this.teacher_id);
teacher.trips.push(this._id);
  await teacher.save();
}
    );


 
export default mongoose.model('SchoolTrip', schoolTripSchema);
