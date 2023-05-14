import express from "express";
const router = express.Router();
import {
  addStudent,
  getAllStudents,
  getStudentID,
  updateStudentLocalization,
  updateStudentDeviceId,
  loginStudentEmail,
  loginStudentCode,
} from "../controllers/studentController.js";
import {
  addTeacher,
  getTeacherId,
  updateTeacherLocalization,
  updateTeacherDeviceId,
  loginTeacherCode,
  loginTeacherEmail,
} from "../controllers/teacherController.js";

import { getTrip,
  getTripStudent,
  getTripInProgressTeacher
} from "../controllers/tripController.js";

//Student
router.route("/addStudent").post(addStudent);

router.get("/getAllStudents", getAllStudents);

router.get("/getStudent/:id", getStudentID);

router.post("/addTeacher", addTeacher);

router.patch("/updateStudentLocalization/:id", updateStudentLocalization);

router.patch("/updateStudentDeviceId/:id", updateStudentDeviceId);
router.post("/loginStudentEmail", loginStudentEmail);
router.post("/loginStudentCode", loginStudentCode);

//Teacher

router.get("/getTeacher/:id", getTeacherId);
router.patch("/updateTeacherLocalization/:id", updateTeacherLocalization);
router.patch("/updateTeacherDeviceId/:id", updateTeacherDeviceId);
router.post("/loginTeacherEmail/", loginTeacherEmail);
router.post("/loginTeacherCode/", loginTeacherCode);

//Trip
router.get("/getTrip/:id", getTrip);
router.get("/getTripStudent/:id", getTripStudent);
router.get("/getTripInProgressTeacher/:id", getTripInProgressTeacher);


export default router;
