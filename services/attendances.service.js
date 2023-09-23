const connObjectName = require('../utilities/dbConnection')

const locationServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query(`select * from attendances`)
            .then(result => {
                res.json(result[0])
            })
            .catch(err => {
                res.status(500).json(err.messages)
            })
    },
    getById: async function(req, res, next) {
        await connObjectName.query(`select * from attendances where id = ${req.parmas.id}`)
            .then( ( [data, columns] ) => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json(err.messages)
            })
    },
    update: async function(req, res, next) {
        await connObjectName.execute(`update attendances set user_id = ?, subject_id = ?, scan_date = ?`,
        [model.user_id, model.subject_id, model.scan_date])
            .then(result => {
                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    insert: async function(req, res, next) {
        await connObjectName.execute(`insert into attendances (user_id, subject_id, scan_date) values (?, ?, ?)`,
        [model.user_id, model.subject_id, model.scan_date])
            .then ( result => {
                res.json(result[0].affectedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
}