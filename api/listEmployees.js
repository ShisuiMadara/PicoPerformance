const mysql = require('mysql')
//done
async function getAll (req, res) {
  console.log(req.user)
  if (req.user.isAdmin == 0) {
    res.status(403).send({
      message: 'Access Denied',
      success: false
  })
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
      res.status(400).send({
        message: 'Datbase Error',
        success: false
    })
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Employee WHERE IsAdmin = 0'
    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send({
          message: 'Unknown Error',
          success: false
      })
        return 0
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send({
        success: true,
        data: {
          list: result
        }
    })
    })
  })
}

exports.execute = getAll
