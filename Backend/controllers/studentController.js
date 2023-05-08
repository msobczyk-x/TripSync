const Student = require('../database/models/studentModel');


async function addStudent(req,res) {
    console.log(req.body);
    const { id, first_name, last_name, phone_number, teacher_id } = req.body;
    const student = new Student ({
        id,
        first_name,
        last_name,
        phone_number,
        teacher_id,
    });
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function getAllStudents(req,res) {
    try {
        const student = await Student.findOne({ id: req.params.id });
        res.json(student);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };

async function getStudentID(req,res) {
    try {
        const student = await Student.findOne({ id: req.params.id });
        res.json(student);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    };

async function updateStudentLocalization(req,res) {
    if (req.body.location != null) {
        res.student.location = req.body.location;
      }
      try {
        const result = await Student.findByIdAndUpdate(req.params.id, {
          location: req.body.location,
        });
    
        res.json(result);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }

async function updateStudentDeviceId(req,res) {
    if (req.body.device_id != null) {
        res.student.device_id = req.body.device_id;
      }
      try {
        const result = await Student.findByIdAndUpdate(req.params.id, {
          device_id: req.body.device_id,
        });
        res.json(result);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }

module.exports = {
    addStudent,
    getAllStudents,
    getStudentID,
    updateStudentLocalization,
    updateStudentDeviceId
}; 