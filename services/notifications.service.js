const dbConn = require('../utilities/dbConnection')
const Messenger = require('../utilities/messenger')

const NotificationService = {
    // -- internal methods
    notifyAll: async function(title, msg) {
        await dbConn.query(`select token from students where token is not null`)
            .then(([data, fields]) => {
                for(var i=0; i<data.length; i++) {
                    Messenger.sendByToken(data[i].token, title, msg)
                }
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    // -- public methods
    notifyByStudentEmail: async function(req, res, next) {
        var model = req.body;

        await dbConn.query(`select token from students where email = ${model.email}`)
            .then(([data, fields]) => {
                if(data.length > 0) {
                    Messenger.sendByToken(data[0].token, model.title, model.msg)
                }
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = NotificationService;