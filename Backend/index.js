
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');
const app = express();

const mongoString = process.env.DATABASE_URL;
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('connected', () => console.log('Connected to Database'));
//TripSync