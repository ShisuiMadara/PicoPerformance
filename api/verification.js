const mysql = require('mysql')
//done
async function isValid (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body
  const id = req.EmailId

  con.connect((err) => {
    if (err) {
      res.status(400).send({
        message: 'Datbase Error',
        success: false
      })
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Employee WHERE EmailId = "' + id + '"'
    con.query(sql, async function (erro, result) {
      if (erro) {
        res.status(400).send({
          message: 'Unknown Error',
          success: false
        })
        return 0
      }

      if (result.length === 0) {
        console.log('Invalid user')
        res.status(404).send({
          data : {verified: false},
          success: true
        })
      }

      res.send({
        data : {verified: true},
        success: true
      })
    })
  })
}

exports.execute = isValid
