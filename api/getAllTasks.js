const mysql = require('mysql')
//done
async function getAllTasks (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body

  const find = req.EmployeeId
  con.connect((err) => {
    if (err) {
      res.status(400).send({
        success: false,
        message: 'Database Error'
      })
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Tasks WHERE EmployeeId = "' + find + '"'

    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send({
          success: false,
          message: 'Unknown Error'
        })
        return 0
      }
      if (result.length === 0) {
        res.status(404).send({
          message: 'No record in database',
          success: false
        })
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send({
        success: true,
        data: {
          Tasks: result
        }
      })
    })
  })
}

exports.execute = getAllTasks
