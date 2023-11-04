const connObjectName = require('../utilities/dbConnection')
const sql = `select t1.subject_id as sujectId, t3.subject_name as subjectName, t3.course_id as courseId, t4.course_name as courseName, 
                t2.id as studentId, t2.email as studentEmail,
                t1.scan_date as scanDate
                from attendances t1
                    left join students t2 on t1.student_id = t2.id
                    left join subjects t3 on t1.subject_id = t3.id 
                    left join courses t4 on t3.course_id = t4.id `

const attendanceService = {
    getAll: async function(req, res, next) {
        await connObjectName.query(`${sql}`)
            .then(([data, fields]) => {
                res.json(data[0]);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getById: async function(req, res, next) {
        let id = req.params.id;

        await connObjectName.query(`${sql} where id = ${id}`)
            .then(([data, fields]) => {
                res.json(data[0]);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getBySubject: async function(req, res, next) {
        let id = req.params.id;

        await connObjectName.query(`${sql} where t1.subject_id = ${id}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
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
        let model = req.body

        await connObjectName.execute(`insert into attendances (student_id, subject_id)
                                        select id, ${model.subjectId} from students where email='${model.email}' `)
            .then ( result => {
                res.json(result[0].affectedRows)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
}

module.exports = attendanceService