import express from "express";
const router = express.Router();
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname+'.jpg');
  }
});
const upload = multer( {storage: storage });
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
  getTeacherPhoneNumber,
} from "../controllers/teacherController.js";

import {
  getTrip,
  getTripStudent,
  getTripInProgressTeacher,
  getTripStudentsLocalization,
  getTripTeacherLocalization,
  uploadTripPhoto,
  getTripPhotos,
  getTripStudentsParentsPhoneNumbers,
  deleteTripPhoto,
  updateTripTask,
} from "../controllers/tripController.js";

//Student
router.route("/addStudent").post(addStudent);

router.get("/getAllStudents", getAllStudents);

router.get("/getStudent/:id", getStudentID);

router.post("/addTeacher", addTeacher);

router.post("/updateStudentLocalization/:id", updateStudentLocalization);

router.patch("/updateStudentDeviceId/:id", updateStudentDeviceId);
router.post("/loginStudentEmail", loginStudentEmail);
router.post("/loginStudentCode", loginStudentCode);

//Teacher

router.get("/getTeacher/:id", getTeacherId);
router.get("/getTeacherPhoneNumber/:id", getTeacherPhoneNumber);
router.post("/updateTeacherLocalization/:id", updateTeacherLocalization);
router.patch("/updateTeacherDeviceId/:id", updateTeacherDeviceId);
router.post("/loginTeacherEmail/", loginTeacherEmail);
router.post("/loginTeacherCode/", loginTeacherCode);

//Trip
router.get("/getTrip/:id", getTrip);
router.get("/getTripStudent/:id", getTripStudent);
router.get("/getTripInProgressTeacher/:id", getTripInProgressTeacher);
router.get("/getTripStudentsLocalization/:id", getTripStudentsLocalization);
router.get("/getTripTeacherLocalization/:id", getTripTeacherLocalization);
router.post("/uploadTripPhoto/:id/:author_id",upload.single('photo'), uploadTripPhoto);
router.get("/getTripPhotos/:id", getTripPhotos);
router.get("/getTripStudentsPhoneNumbers/:id", getTripStudentsParentsPhoneNumbers);
router.delete("/deleteTripPhoto/:id/:file_name", deleteTripPhoto);
router.post("/updateTripTask/:id/:task_id", updateTripTask);
  


export default router;
