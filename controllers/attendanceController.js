const express = require('express')
const AttendanceService = require('../services/attendances.service')
const router = express.Router()

router.route('/attendances')
    .get(AttendanceService.getAll)
router.route('/attendances/subject/:id')
    .get(AttendanceService.getBySubject)
router.route("/attendance/id/:id")
    .get(AttendanceService.getById)

router.route('/attendance')
    .post(AttendanceService.insert)

module.exports = router;