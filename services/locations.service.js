const connObjectName = require('../utilities/dbConnection')
const selectQuery = `select id as locationId, code as locationCode, description as locationDes, status as locationStatus from locations`

const locationServices = {
    getAll: async function(req, res, next) {
        await connObjectName.query(`${selectQuery}`)
            .then(result => {
                res.json(result[0])
            })
            .catch(err => {
                res.status(500).json(err.messages)
            })
    },
    getById: async function(req, res, next) {
        await connObjectName.query(`${selectQuery} where id = ?`,
        [req.params.id])
            .then( ( [data, columns] ) => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json(err.messages)
            })
    },
    update: async function(req, res, next) {
        let model = req.body

        await connObjectName.execute(`update locations set code = ?, description = ? where id = ?`,
        [model.locationCode, model.locationDes, model.locationId])
            .then(result => {
                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    insert: async function(req, res, next) {
        let model = req.body

        await connObjectName.execute(`insert into locations (code, description) values (?, ?)`, 
        [model.locationCode, model.locationDes])
            .then ( result => {
                res.json(result[0].affectedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    mark: async function(req, res, next) {
        let model = req.body

        await connObjectName.execute(`update locations set status = ${model.locationStatus} where id = ${model.locationId }`)
            .then(result => {
                res.json(result[0].changedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
}

module.exports = locationServices