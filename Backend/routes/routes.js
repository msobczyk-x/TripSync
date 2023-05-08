const express = require("express");

const router = express.Router();
const Student = require("../database/models/studentModel.js");
const Teacher = require("../database/models/teacherModel.js");
const SchoolTrip = require("../database/models/tripModel.js");
const { default: mongoose } = require("mongoose");
const {
  addStudent,
  getAllStudents,
  getStudentID,
  updateStudentLocalization,
  updateStudentDeviceId,
} = require("../controllers/studentController.js");
const { addTeacher } = require("../controllers/teacherController.js");

//Post Method
router.route("/addStudent").post(addStudent);

router.get("/getAllStudents", getAllStudents);

router.get("/getStudent/:id", getStudentID);

router.post("/addTeacher", addTeacher);

router.patch("/updateStudentLocalization/:id", updateStudentLocalization);

router.patch("/updateStudentDeviceId/:id", updateStudentDeviceId);

module.exports = router;
