const coursesServices = require('../services/courses.service')
const express = require('express')

const router = express.Router()

router.route('/courses')
    .get(coursesServices.getAll)
router.route('/course/id/:id')
    .get(coursesServices.getById)
router.route('/course')
    .put(coursesServices.update)
    .post(coursesServices.insert)
router.route('/course/mark')
    .put(coursesServices.mark)

module.exports = router