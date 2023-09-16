const connObjectName = require('../utilities/dbConnection')

const studentsServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query(`select * from students`)
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    getById: async function(req, res, next) {
        await connObjectName.query(`select * from students where id = ?`,
        [req.params.id])
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    getByToken: async function(req, res, next) {
        await connObjectName.query(`select * from students where token = ?`,
        [req.params.token])
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    getByEmail: async function(req, res, next) {
        await connObjectName.query(`select * from students where email = ?`,
        [req.params.email])
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    upsert: async function(req, res, next) {
        let model = req.body

        await connObjectName.query(`select * from students where email = '${model.email}'`)
        .then(async ([data,fields]) => {
            if(data.length == 0) {
                await connObjectName.execute(`insert into students (email, token) values ('${model.email}', '${model.token}')`)
                    .then(result => {
                        res.json(result[0].affectedRows)
                    })
                    .catch(err => {
                        res.status(500).json(err.message)
                    })
            }
            else {
                await connObjectName.execute(`update students set token = '${model.token}' where email = '${model.email}'`)
                .then(result => {
                    res.json(result[0].changedRows)
                })
            }
        })
    }
}

module.exports = studentsServices