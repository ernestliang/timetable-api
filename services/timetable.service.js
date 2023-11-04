const connObjectName = require('../utilities/dbConnection')
const notificationServices = require('./notifications.service')

const leftJoinQuery = `SELECT t1.id AS timetableId, t1.subject_id AS subjectId, t1.status AS status, t2.subject_name AS subjectName, t2.code AS subjectCode, t2.color AS color,
                        t3.course_name AS courseName, t3.code AS courseCode, t1.start_time AS startTime, t1.end_time AS endTime, t1.class_day AS classDay,
                        t4.id AS locationId, t4.code AS classroomCode, t4.description AS locationDes
                        FROM timetable t1
                            LEFT JOIN subjects t2 ON t1.subject_id = t2.id
                            LEFT JOIN courses t3 ON t2.course_id = t3.id
                            LEFT JOIN locations t4 ON t4.id = t1.location_id`

const timetableServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query(`${leftJoinQuery}`)
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.messages)
        })
    },
    getById: async function(req,res,next) {
        await connObjectName.query(`${leftJoinQuery} where t1.id = ?`,
        [req.params.id])
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.messages)
        })
    },
    getByCourseId: async function(req, res, next) {
        await connObjectName.query(`${leftJoinQuery} where t3.id = ?`,
        [req.params.id])
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.messages)
        })
    },
    update: async function(req, res, next) {
        let model = req.body

        await connObjectName.execute(`update timetable set subject_id = ?, start_time = ?, end_time = ?, class_day = ? where id = ?`,
        [model.subjectId, model.newStartTime, model.newEndTime, model.newDay, model.timetableId])
        .then(result => {
            // Notification
            notificationServices.notifyAll(`${model.courseName} ALERT!`, `${model.subjectName} has been moved to ${model.newStartTime} on ${timetableServices.convertDay(model.newDay)}`)

            // Return result to user
            res.json(result[0].changedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`insert into timetable (subject_id, location_id, start_time, end_time, class_day) values (?, ?, ?, ?, ?)`,
        [model.subjectId, model.locationId, model.startTime, model.endTime, model.classDay])
        .then ( result => {
            // Notification
            notificationServices.notifyAll(`${model.courseName} ALERT!`, `A new class for ${model.subjectName} has been added to ${model.startTime} on ${timetableServices.convertDay(model.classDay)}.`)

            res.json(result[0].affectedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    mark: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`update timetable set status = ${model.status} where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    delete: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`delete from timetable where id = ${model.timetableId}`)
            .then(result => {
                // Notification
                notificationServices.notifyAll(`${model.courseName} ALERT!`,`${model.subjectName} on ${timetableServices.convertDay(model.newDay)} has been REMOVED!`)

                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    convertDay: function(dayNum) {
        const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

        return days[dayNum - 1]
    }
}

module.exports = timetableServices