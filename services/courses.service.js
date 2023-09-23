const connObjectName = require('../utilities/dbConnection')

const selectQuery = `select id as courseId, course_name as courseName, code as courseCode, status as courseStatus from courses`

const coursesServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query(selectQuery)
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.messages)
        })
    },
    getById: async function(req, res, next) {
        await connObjectName.query(`${selectQuery} where id = ?`, [req.params.id])
        .then( ( [data, columns] ) => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json(err.messages)
        })
    },
    update: async function(req, res, next) {
        let model = req.body

        await connObjectName.execute(`update courses set course_name = ?, code = ? where id = ?`,
        [model.courseName, model.courseCode, model.courseId])
        .then(result => {
            res.json(result[0].changedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`insert into courses (course_name, code) values (?, ?)`,
        [model.courseName, model.courseCode])
        .then ( result => {
            res.json(result[0].affectedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    mark: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`update courses set status = ${model.courseStatus} where id = ${model.courseId}`)
            .then(result => {
                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = coursesServices