const mysql = require('mysql')

async function filter (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body

  const startDate = req.StartDate
  const endDate = req.EndDate
  const Usr = req.EmployeeId

  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Tasks WHERE StartDate BETWEEN "' + startDate + ' 00:00:00" AND "' + endDate + ' 23:59:59" AND EmployeeId=' + Usr

    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }
      if (result.length === 0) {
        res.status(404).send('No record in database')
      }
      res.send(result)
    })
  })
}

exports.execute = filter
