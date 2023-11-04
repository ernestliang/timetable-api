const timetableServices = require ('../services/timetable.service')
const express = require('express')
const router = express.Router()

router.route('/timetable')
    .get(timetableServices.getAll)
    .put(timetableServices.update)
    .post(timetableServices.insert)
    .delete(timetableServices.delete)
router.route('/timetable/id/:id')
    .get(timetableServices.getById)
router.route('/timetable/course/:id')
    .get(timetableServices.getByCourseId)

module.exports = router