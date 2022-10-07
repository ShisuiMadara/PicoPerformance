const mysql = require('mysql')

async function getAllTasks (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body

  const find = req.EmailId
  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Employee WHERE EmailId = "' + find + '"'

    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }
      if (sql.length === 0) {
        res.status(404).send('No record in database')
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send(result)
    })
  })
}

exports.execute = getAllTasks
