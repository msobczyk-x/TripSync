
const Teacher = require("../database/models/teacherModel.js");

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


module.exports = {
    addTeacher,

};