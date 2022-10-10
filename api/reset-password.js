const bcrypt = require('bcrypt')
const mysql = require('mysql')

async function hashPassword (Password) {
  return bcrypt.hash(Password, 10)
}

async function updatePassword (req, res) {
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

  console.log(token)
  console.log(password)
  console.log(emailId)
  con.query('SELECT * FROM Tokens WHERE token ="' + token + '"', async function (err, result) {
    if (err) throw err

    if (result.length === 0) {
      res.status(404).send('Token not found error')
      con.end()
    }
    const PasswordHash = await hashPassword(password)

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

    res.status(200).send({
      message: 'Email with reset link has been sent',
      success: true
    })
    con.end()
  })
}

exports.execute = updatePassword
