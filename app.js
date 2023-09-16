const express = require('express');
const cors = require('cors');
const coursesController = require('./controllers/coursesController');
const subjectsController = require('./controllers/subectsController');
const timetableController = require('./controllers/timetableController')
const studentsController = require('./controllers/studentsController')

var app = express();

app
    .use(cors())
    .use(express.json())
    .use(coursesController)
    .use(subjectsController)
    .use(timetableController)
    .use(studentsController)

const portName = process.env.PORT || 3000;
app.listen(portName, () => {
    console.log(`Listening in to port ${portName}`)
});