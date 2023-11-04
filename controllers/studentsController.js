const studentsServices = require ('../services/students.service')
const express = require('express')
const router = express.Router()

router.route('/students')
    .get(studentsServices.getAll)

router.route('/student/id/:id')
    .get(studentsServices.getById)
router.route('/student/email/:email')
    .get(studentsServices.getByEmail)
router.route('/student/token/:token')
    .get(studentsServices.getByToken)

router.route('/student/register')
    .post(studentsServices.upsert)


module.exports = router