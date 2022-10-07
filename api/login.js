const User = require('../PicoPerformance/database/schemas/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mysql = require('mysql')

async function validatePassword (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

User.login = async (res, value) => {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM user WHERE EmailID = "' + value + '"'
    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send('User added Successfully!')
    })
  })
}

async function login (req, res, next) {
  try {
    const user = await User.login(res, req.body.EmailId)
    if (user) {
      const validPass = await validatePassword(req.body.Password, user.Password)
      if (!validPass) return res.status(400).send('Mobile/Email or Password is wrong')

      const token = jwt.sign({ id: user.EmailId, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET)
      res.header('auth-token', token).send({ token })
    }
  } catch (err) {
    next(err)
    res.status(400).send(err)
  }
}

exports.execute = login
