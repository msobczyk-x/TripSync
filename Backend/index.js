import 'dotenv/config'
const express = require('express');
const routes = require('./routes');
const app = express();

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//TourTrack
//TripSync