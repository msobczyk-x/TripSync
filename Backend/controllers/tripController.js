import SchoolTrip from "../models/tripModel.js";


//Trip

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
        }).populate('Students');

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

export {
    getTrip,
    getTripStudent,
    getTripInProgressTeacher,
    getTripStudentsLocalization,
    getTripTeacherLocalization
};