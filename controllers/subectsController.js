const subjectsServices = require('../services/subjects.service')
const express = require('express')
const router = express.Router()

router.route('/subjects')
    .get(subjectsServices.getComplete)
router.route('/subject/id/:id')
    .get(subjectsServices.getById)
router.route('/subject/courseId/:courseId')
    .get(subjectsServices.getByCourseId)
router.route('/subject')
    .put(subjectsServices.update)
    .post(subjectsServices.insert)

module.exports = router