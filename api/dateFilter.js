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

  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Tasks WHERE StartDate BETWEEN "' + startDate + '" AND "' + endDate + '"'

    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }
      if (result.length === 0) {
        res.status(404).send('No record in database')
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send(result)
    })
  })
}

exports.execute = filter
