const mysql = require('mysql')

async function getAll (req, res) {
  console.log(req.user)
  if (req.user.isAdmin == 0) {
    res.status(401).send('Access Denied')
    return
  }
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
    const sql = 'SELECT * FROM Employee WHERE IsAdmin = 0'
    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send(result)
    })
  })
}

exports.execute = getAll
