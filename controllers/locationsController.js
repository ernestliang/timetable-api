const locationsServices = require('../services/locations.service')
const express = require('express')

const router = express.Router()

router.route('/locations')
    .get(locationsServices.getAll)
router.route('/location/id/:id')
    .get(locationsServices.getById)
router.route('/location')
    .put(locationsServices.update)
    .post(locationsServices.insert)
router.route('/location/mark')
    .put(locationsServices.mark)

module.exports = router