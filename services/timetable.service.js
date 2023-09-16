const connObjectName = require('../utilities/dbConnection')
const leftJoinQuery = `SELECT t1.id AS timetableId, t1.subject_id AS subjectId, t2.subject_name AS subjectName, t2.code AS subjectCode, t3.course_name AS courseName, t3.code AS courseCode, t1.start_time AS startTime, t1.end_time AS endTime, t1.day
                        FROM timetable t1
                            LEFT JOIN subjects t2 ON t1.subject_id = t2.id
                            LEFT JOIN courses t3 ON t2.course_id = t3.id`

const timetableServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query(`select * from timetable`)
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

        await connObjectName.execute(`update timetable set subject_id = ?, start_time = ?, end_time = ?, day = ? where id = ?`,
        [model.subjectId, model.startTime, model.endTime, model.day, model.id])
        .then(result => {
            res.json(result[0].changedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`insert into timetable (subject_id, start_time, end_time, day) values (?, ?, ?, ?)`,
        [model.subjectId, model.startTime, model.endTime, model.day])
        .then ( result => {
            res.json(result[0].affectedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
}

module.exports = timetableServices