const mysql = require('mysql')

async function getList (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Employees WHERE isAdmin = 1 AND isBlocked = 0'
    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send(sql)
    })
  })
}

exports.execute(getList)
