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

  const token = req.body.Token
  const password = req.body.Password

  con.query('SELECT * FROM Employee WHERE token ="' + token + '"', function (err, result) {
    if (err) throw err

    if (result.length === 0) {
      res.status(404).send('Token not found error')
    }
    const PasswordHash = hashPassword(password)

    con.query('UPDATE Employee SET PasswordHash = "' + PasswordHash + '" WHERE Token = "' + token + '"', function (err, result) {
      if (err) throw err
      if (result.length === 0) {
        res.status(404).send('Token not found in database')
      }

      console.log('Password updated successfully')
    })

    con.query('DELETE FROM Tokens WHERE Token = "' + token + '"', function (err, result) {
      if (err) throw err
      if (result.affectedRows === 0) {
        res.status(400).send('Query failed')
      }

      console.log('Token dropped successfully')
    })
  })
}

exports.execute = updatePassword
