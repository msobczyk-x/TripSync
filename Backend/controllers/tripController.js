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

export {
    getTrip,
    getTripStudent,
    getTripInProgressTeacher
};