const mysql = require('mysql')
// done
async function getAllTasks (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body

  const find = req.EmployeeId
  const isSearch = req.Search
  con.connect((err) => {
    if (err) {
      res.status(400).send({
        success: false,
        message: 'Database Error'
      })
      return 0
    }
    console.log('Connected!')
    let sql = 'SELECT * FROM Tasks WHERE EmployeeId = "' + find + '"'
    if (isSearch) { sql = sql + ' AND StartDate BETWEEN "' + req.StartDate + '" AND "' + req.EndDate + '"' }
    console.log(sql)

    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send({
          success: false,
          message: 'Unknown Error'
        })
        con.end()
        return 0
      }

      res.send({
        success: true,
        data: {
          Tasks: result
        }
      })
      con.end()
      return 0
    })
  })
}

exports.execute = getAllTasks
