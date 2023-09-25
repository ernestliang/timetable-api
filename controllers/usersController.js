const usersServices = require('../services/users.service')
const express = require('express')

const router = express.Router()

router.route('/users')
    .get(usersServices.getAll)
router.route('/user/id/:id')
    .get(usersServices.getById)
router.route('/user/email/:email')
    .get(usersServices.getByEmail)
router.route('/user')
    .put(usersServices.update)
    .post(usersServices.insert)
router.route('/user/mark')
    .put(usersServices.mark)

module.exports = router