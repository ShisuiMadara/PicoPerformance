const mysql = require('mysql')
// done
function handler (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })
  req = req.body
  let blk = '0'
  let Blocked = 'Unblocked'
  if (req.Block === true) {
    blk = '1'
    Blocked = 'Blocked'
  }
  console.log(blk)
  con.connect(async (err) => {
    if (err) {
      res.status(400).send({
        message: 'Datbase Error',
        success: false
      })
      return 0
    }
    const sql = 'Update Employee Set IsBlocked=' + blk + " where EmailId='" + req.EmailId + "'"
    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send({
          success: false,
          message: 'Query Error'
        })
        con.end()
        return 0
      }
      res.send({
        message: 'User ' + Blocked + ' Successfully!',
        success: true
      })
      con.end()
      return 0
    })
  })
}
exports.execute = handler
