const connObjectName = require('../utilities/dbConnection')

const leftJoinQuery =  `select t1.id AS subjectId, t1.subject_name AS subjectName, t1.code AS subjectCode, t1.status as status, t1.color as color,
                                    t2.id AS courseId, t2.course_name AS courseName, t2.code AS courseCode
                                        FROM subjects t1
                                            LEFT JOIN courses t2 ON t1.course_id = t2.id`

const subjectsServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query(`select * from subjects`)
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.messages)
        })
    },
    getComplete: async function(req, res, next) {
        await connObjectName.query(leftJoinQuery)
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    getById: async function(req, res, next) {
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
        await connObjectName.query(`${leftJoinQuery} where t1.course_id = ?`,
        [req.params.courseId])
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.messages)
        })
    },
    update: async function(req, res, next) {
        let model = req.body

        await connObjectName.execute(`update subjects set subject_name = ?, course_id = ?, code = ?, color = ? where id = ?`,
        [model.subjectName, model.courseId, model.subjectCode, model.color, model.subjectId])
        .then(result => {
            res.json(result[0].changedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`insert into subjects (subject_name, course_id, code, color) values (?, ?, ?, ?)`,
        [model.subjectName, model.courseId, model.subjectCode, model.color])
        .then ( result => {
            res.json(result[0].affectedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    mark: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`update subjects set status = ${model.status} where id = ${model.subjectId}`)
            .then(result => {
                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = subjectsServices