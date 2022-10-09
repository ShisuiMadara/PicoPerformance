const mysql = require('mysql')
const bcrypt = require('bcrypt')

async function hashPassword (Password) {
  return await bcrypt.hash(Password, 10)
}

async function changePassword (req, res) {
  if (req.user.EmailId !== req.body.EmailId) {
    res.status(401).send({
      message: 'Unauthorized',
      success: false
    })
  }
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body
  const newPassword = req.Password
  const newHashedPassword = await hashPassword(newPassword)
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
    const sql = 'UPDATE Employee SET PasswordHash = "' + newHashedPassword + '" WHERE EmailId = "' + id + '"'
    con.query(sql, async function (erro, result) {
      if (erro) {
        res.status(400).send({
          message: 'Unknown Error',
          success: false
        })
        return 0
      }

      if (result.affectedRows === 0) {
        console.log('Invalid user')
        res.status(404).send({
          message: 'Query failed',
          success: false
        })
      }

      res.status(200).send({
        success: true,
        message: 'Password Changed Successfully'
      })
    })
  })
}

exports.execute = changePassword
