const bcrypt = require('bcrypt')
const mysql = require('mysql')

async function hashPassword (Password) {
  return await bcrypt.hash(Password, 10)
}

function forgotPassword (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  const password = hashPassword(req.Password)
  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'UPDATE Employee SET PasswordHash = "' + password + '" WHERE EmailId = "' + req.EmailId + '"'
    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send('User updated Successfully!')
    })
  })
}

module.exports({ forgotPassword })
