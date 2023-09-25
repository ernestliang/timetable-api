const connObjectName = require('../utilities/dbConnection')
const selectQuery = `select id as userId, name as userName, email as userEmail, password as userPassword, status as userStatus from users`

const usersServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query(`${selectQuery}`)
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    getById: async function(req, res, next) {
        await connObjectName.query(`${selectQuery} where id = ?`,
        [req.params.id])
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    getByEmail: async function(req, res, next) {
        await connObjectName.query(`${userEmail} where email = ?`,
        [req.params.email])
        .then(result => {
            res.json(result[0])
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    update: async function(req, res, next) {
        let model = req.body

        await connObjectName.execute(`update users set name = ?, email = ?, password = ?, status = ? where id = ?`,
        [model.subjectName, model.userName, model.userEmail, model.userPassword, model.userId])
        .then(result => {
            res.json(result[0].changedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await connObjectName.execute(`insert into users (name, email, password, status) values (?, ?, ?, ?)`,
        [model.userName, model.userEmail, model.userPassword, model.userStatus])
        .then ( result => {
            res.json(result[0].affectedRows)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    },
    mark: async function(req, res, next) {
        let model = req.body

        await connObjectName.execute(`update users set status = ${model.userStatus} where id = ${model.userId}`)
            .then(result => {
                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    // upsert: async function(req, res, next) {
    //     let model = req.body

    //     await connObjectName.query(`select * from users where email = '${model.email}'`)
    //     .then(async ([data,fields]) => {
    //         if(data.length == 0) {
    //             await connObjectName.execute(`insert into users (email, token) values ('${model.email}', '${model.token}')`)
    //                 .then(result => {
    //                     res.json(result[0].affectedRows)
    //                 })
    //                 .catch(err => {
    //                     res.status(500).json(err.message)
    //                 })
    //         }
    //         else {
    //             await connObjectName.execute(`update users set token = '${model.token}' where email = '${model.email}'`)
    //             .then(result => {
    //                 res.json(result[0].changedRows)
    //             })
    //         }
    //     })
    // }
}

module.exports = usersServices