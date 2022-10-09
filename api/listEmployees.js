const mysql = require('mysql')
//done
async function getAll (req, res) {
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
  req = req.body;
  if (!req.Search) req.Search = ''
  con.connect((err) => {
    if (err) {
      res.status(400).send({
        message: 'Datbase Error',
        success: false
    })
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT EmployeeId, Name, EmailId, ContactNo, JoiningDate, Department, IsBlocked, IsAdmin FROM Employee WHERE IsAdmin = 0 AND (EmailId="' + req.Search + '"' + 'OR Name LIKE "%' + req.Search + '%")'
    con.query(sql, function (erro, result) {
      if (erro) {
        console.log(erro.message)
        res.status(400).send({
          message: 'Unknown Error',
          success: false
        })
        return 0
      }
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
