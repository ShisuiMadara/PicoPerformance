const mysql = require('mysql')
// redundant
async function search (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body

  const data = req.EmailId_or_Name

  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Employee WHERE EmailId = "' + data + '" OR Name = "' + data + '"'

    con.query(sql, async function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        con.end()
        return 0
      }

      res.send(result)
      con.end()
      return 0
    })
  })
}

exports.execute = search
