const express = require('express');

const router = express.Router();
const {Student, Teacher, SchoolTrip} = require('../database/models/model.js');
const { default: mongoose } = require('mongoose');

//Post Method
router.post('/addStudent', async (req, res) => {
    console.log(req);
    const student = new Student({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        teacher_id: req.body.teacher_id,
    })
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/getAllStudents', async (req, res) => {
    try {
        
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/getStudent/:id', (req, res) => {
     try {
        const student = Student.findOne({ id: req.params.id });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message })

     }
})


router.post('/addTeacher', (req, res) => {
    const teacher = new Teacher({
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        school: req.body.school,

    })
    try {
        const newTeacher = teacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.patch('/updateStudentLocalization/:id', async (req, res) => {
    if (req.body.location != null) {
        res.student.location = req.body.location;
    }
    try {
        const result = await Student.findByIdAndUpdate(req.params.id, { location: req.body.location });

        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/updateStudentDeviceId/:id', async (req, res) => {
    if (req.body.device_id != null) {
        res.student.device_id = req.body.device_id;
    }
    try {
        const result = await Student.findByIdAndUpdate(req.params.id, { device_id: req.body.device_id });
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



module.exports = router;