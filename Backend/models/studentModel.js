import mongoose from 'mongoose';
import {customAlphabet, nanoid} from 'nanoid';
const nano = customAlphabet('1234567890', 6);
const studentSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true

    },
    first_name:{
        type: String,
        required: true,
        trim: true
    },
    last_name:{
        type: String,
        required: true,
        trim: true
    },
    phone_number:{
        type: String,
        required: true,
        maxDigits: 9,
        validate: {
            validator: function(v) {
                return /\d{3}\d{3}\d{3}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number! (correct format: 123456789) (9digits))`
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
                }
        }
    },
    code: {
        type: String,
        required: false,
    },
    
    device_id:{
        type: String,
        required: false,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    }

});

studentSchema.pre('save', async function (next) {
    const randomCode = nano(6);
    do {
        const checkCode = await mongoose.model('Student', studentSchema).findOne({code: randomCode});
        if (checkCode) {
            randomCode = nano(6);
        }
        else {
            this.code = randomCode;
            break;
        }
    } while (true);

    next();
  });

export default mongoose.model('Student', studentSchema);