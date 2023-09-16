const connObjectName = require('../utilities/dbConnection')

const coursesServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query('select * from courses')
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.messages)
        })
    },
    getById: async function(req, res, next) {
        await connObjectName.query('select * from courses where id = ?', [req.params.id])
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
        [model.courseName, model.code, model.id])
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
        [model.courseName, model.code])
        .then ( result => {
            res.json(result[0].affectedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    mark: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`update courses set status = ${model.status} where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = coursesServices