
import Teacher from '../models/teacherModel.js';
async function addTeacher(req, res) {
    const teacher = new Teacher({
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        school: req.body.school,
      });
      try {
        const newTeacher = teacher.save();
        res.status(201).json(newTeacher);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }

async function getTeacherId(req,res) {
    try {
        const teacher = await Teacher.findOne({ id: req.params.id });
        res.json(teacher);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    }

async function updateTeacherLocalization(req,res) {
  try {

      
    
    const result = await Teacher.findByIdAndUpdate(req.params.id, {
      location: req.body.location,
    });

    res.status(200).send("Location updated")
    console.log(`Teacher localization updated`)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

}


async function updateTeacherDeviceId(req,res) {
    if (req.body.device_id != null) {
        res.teacher.device_id = req.body.device_id;
      }
      try {
        const result = await Teacher.findByIdAndUpdate(req.params.id, {
          device_id: req.body.device_id,
        });
        res.json(result);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }

async function loginTeacherEmail (req, res) {
  console.log(req.body.email)
    try {
        const teacher = await Teacher.findOne({ email: req.body.email });
        console.log(teacher)
        if (teacher == null) {
          return res.status(400).send('Invalid email');
        }
        else {
          res.json(teacher.code);
        }
        

        
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
}

async function loginTeacherCode (req, res) {
    try {
        const teacher = await Teacher.findOne({ code: req.body.code });
        if (teacher == null) {
          return res.status(400).send('Invalid code' );
        }
        else {
          res.json(teacher);
        }
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
}

async function getTeacherPhoneNumber (req, res) {
  try {
    console.log(req.params.id)
    const teacher = await Teacher.findOne({ _id: req.params.id }, 'phone_number');
    if (teacher == null) {
      return res.status(400).send('Invalid id');
  }
  else {
    console.log(teacher)
    res.json(teacher.phone_number)
  }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
}

export { addTeacher,
    getTeacherId,
    updateTeacherLocalization,
    updateTeacherDeviceId,
    loginTeacherEmail,
    loginTeacherCode,
    getTeacherPhoneNumber,
  };