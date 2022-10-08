const mysql = require('mysql')
const bcrypt = require('bcrypt')

async function hashPassword (Password) {
  return await bcrypt.hash(Password)
}

async function changePassword (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body
  const newPassword = req.Password
  const newHashedPassword = hashPassword(newPassword)
  const id = req.EmailId

  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'UPDATE Employee SET PasswordHash = "' + newHashedPassword + '" WHERE EmailId = "' + id + '"'
    con.query(sql, async function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }

      if (result.affectedRows === 0) {
        console.log('Invalid user')
        res.status(404).send('Query failed')
      }

      res.send('Success')
    })
  })
}

exports.execute = changePassword
