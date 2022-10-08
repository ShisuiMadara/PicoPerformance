const bcrypt = require('bcrypt')
const mysql = require('mysql')
async function hashPassword (Password) {
  return await bcrypt.hash(Password, 10)
}
async function handler (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })
  req = req.body
  const psw = await hashPassword(req.Password)
  const user = [[req.Name, req.EmailId, req.ContactNo, req.Department, req.JoiningDate, psw]]
  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'INSERT INTO Employee(Name, EmailId, ContactNo, Department, JoiningDate, PasswordHash) VALUES ?'
    con.query(sql, [user], function (erro, result) {
      if (erro) {
        if (erro.code = 'ER_DUP_ENTRY') res.status(400).send('Email Already Exists')
        else res.status(400).send('Unknown Error')
        return 0
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send('User created Successfully!')
    })
  })
}
exports.execute = handler
