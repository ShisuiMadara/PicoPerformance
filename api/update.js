const mysql = require('mysql')
async function handler (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })
  req = req.body
  con.connect(async (err) => {
    if (err) {
      res.status(400).send({
        message: 'Datbase Error',
        success: false
      })
      return 0
    }
    const sql = "Update Employee Set Name='" + req.Name + "', ContactNo='" + req.ContactNo + "' Where EmailId='" + req.EmailId + "'"
    con.query(sql, function (erro, result) {
      if (erro) {
        console.log(erro.message)
        res.status(400).send({
          message: 'Query Error',
          success: false
        })
        return 0
      }
      res.send({
        message: 'Details Edited Successfully!',
        success: true
      })
    })
  })
}
exports.execute = handler
