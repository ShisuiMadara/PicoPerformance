const bcrypt = require('bcrypt')
const mysql = require('mysql')

async function hashPassword (Password) {
  return await bcrypt.hash(Password, 10)
}

function updatePassword (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body

  const token = req.Token
  const password = req.Password
  const emailId = req.EmailId

  con.query('SELECT * FROM Tokens WHERE token ="' + token + '"', function (err, result) {
    if (err) throw err

    if (result.length === 0) {
      res.status(404).send('Token not found error')
      con.end()
    }
    const PasswordHash = hashPassword(password)

    con.query('UPDATE Employee SET PasswordHash = "' + PasswordHash + '" WHERE EmailId = "' + emailId + '"', function (err, result) {
      if (err) throw err
      if (result.length === 0) {
        res.status(404).send('Token not found in database')
        con.end()
      }

      console.log('Password updated successfully')
    })

    con.query('DELETE FROM Tokens WHERE Token = "' + token + '"', function (err, result) {
      if (err) throw err
      if (result.affectedRows === 0) {
        res.status(400).send('Query failed')
        con.end()
      }

      console.log('Token dropped successfully')
    })
  })
}

exports.execute = updatePassword
