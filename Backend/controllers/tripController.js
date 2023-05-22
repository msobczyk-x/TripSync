import SchoolTrip from "../models/tripModel.js";
import path from 'path';
import fs from 'fs';
import mongoose from "mongoose";
import Student from "../models/studentModel.js";
//Trip
const __dirname = path.resolve();
async function getTrip(req, res) {
    const trip = await SchoolTrip.findById(req.params.id);

    if (trip) {
        res.json(trip);

    }
    else {
        res.status(404).json({message: "Trip not found"});
    }
}

async function getTripStudent(req, res) {
    const trip = await SchoolTrip.findOne({
        trip_status: 'in_progress',
        students_id: { $in: [req.params.id] }
      });


    if (trip) {
        console.log(trip)
        res.json(trip);

    }
    else {
        res.status(400).json({message: "Trip not found"});
    }
}

async function getTripInProgressTeacher(req, res) {
    const trip = await SchoolTrip.findOne({
        trip_status: 'in_progress',
        teacher_id: { $in: [req.params.id] }
        });

    if (trip) {
        res.json(trip);
    }
    else {
        res.status(404).json({message: "Trip not found"});
    }
}
async function getTripStudentsLocalization(req, res) {
    const trip = await SchoolTrip.findOne({
        trip_status: 'in_progress',
        _id: { $in: [req.params.id] }
        }).populate('students_id');

        if (!trip) {
            res.status(404).json({message: "Trip not found"});
        }

        const students = trip.students_id.map(student => {
            return {
                id: student._id,
                first_name: student.first_name,
                last_name: student.last_name,
                location: student.location
            }
        })
        res.json(students);
}

async function getTripStudentsParentsPhoneNumbers(req, res) {
    try {

    
    const trip = await SchoolTrip.findOne({
        trip_status: 'in_progress',
        _id: { $in: [req.params.id] }
        }).populate('students_id');

        if (!trip) {
            res.status(404).json({message: "Trip not found"});
        }

        const students = trip.students_id.map(student => {
            return {
                id: student._id,
                first_name: student.first_name,
                last_name: student.last_name,
                phone_number: student.phone_number,
                parent_phone_number: student.parent_phone_number
            }
        })
        res.json(students);
    }
    catch (error) {
        console.log(error)
    }
}

async function getTripTeacherLocalization(req, res) {
 
    const trip = await SchoolTrip.findOne({
        trip_status: 'in_progress',
        _id: { $in: [req.params.id] }
        }).populate('teacher_id');

        if (!trip) {
            res.status(404).json({message: "Trip not found"});
        }
    

        const teacher = {
            location: trip.teacher_id.location,
            first_name: trip.teacher_id.first_name,
            last_name: trip.teacher_id.last_name
          };
        res.json(teacher);
}

async function uploadTripPhoto(req, res){

    try {
        const authorId = new mongoose.Types.ObjectId(req.params.author_id);
   console.log(req.params.author_id)
   console.log(req.file)
    const trip = await SchoolTrip.findById(req.params.id);
    if (trip) {
        trip.trip_images.push({
            path: req.file.path,
            author: authorId,
            
        });
        const updatedTrip = await trip.save();
        res.send(updatedTrip);
    } else {
        res.status(404).json({ message: 'Trip not found' });
    }
}
catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
}
}

async function getTripPhotos(req, res) {
    const tripId = req.params.id;
    const directoryPath = path.join(__dirname, 'uploads');
    const trip = await SchoolTrip.findById(tripId);
    fs.readdir(directoryPath, async (error, files) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const fileUrls = [];
        
        for (const file of files) {
            console.log(file)
           
            if (trip.trip_images.some((image) => image.path.split('\\')[1] === file)){
                const photo = {
                    url: `http://192.168.1.24:3000/uploads/${file}`,
                    author: {},
                  };
          
                  const photoData = await trip.trip_images.find(
                    (image) => image.path.split('\\')[1] === file
                    ).author;
                    const authorId = await Student.findById(photoData);
                            console.log(photoData)
                  if (photoData) {
                    photo.author = {
                      first_name: authorId.first_name,
                      last_name: authorId.last_name,
                    }
                    
                  }
          
                  fileUrls.push(photo);
            }
        }
  
        res.json(fileUrls);
      }
    });
  }

export {
    getTrip,
    getTripStudent,
    getTripInProgressTeacher,
    getTripStudentsLocalization,
    getTripTeacherLocalization,
    uploadTripPhoto,
    getTripPhotos,
    getTripStudentsParentsPhoneNumbers
};