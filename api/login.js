// const User = require('G:/Projects/PicoPerformance/database/schemas/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
//done
async function validatePassword (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

async function Login (req, res, value) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  con.connect((err) => {
    if (err) {
      res.status(400).send({
        success: false,
        message : 'Database Error'
      })
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Employee WHERE EmailId = "' + value + '"'
    con.query(sql, async function (erro, result) {
      if (erro) {
        res.status(400).send({
            success: false,
            message : 'Unknown Error'
          })
	console.log(erro.message)
        return 0
      }
      const user = result[0]
      if (user) {
        console.log(req.body.Password)
        const validPass = await validatePassword(req.body.Password, user.PasswordHash)
        if (!validPass) {
          res.status(400).send({
            success: false,
            message : 'Email or Password is wrong'
          })
          return 0
        }
  
        const token = jwt.sign({ id: user.EmailId, Eid: user.EmployeeId, isAdmin: user.IsAdmin, isBlock: user.IsBlocked }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.send({
          success: true,
          data: {"token": token}
        })
      }
    })
  })
}

async function login (req, res, next) {
  try {
    const user = await Login(req, res, req.body.EmailId)
    if (user) {
      const validPass = await validatePassword(req.body.Password, user.Password)
      if (!validPass) return res.status(400).send('Mobile/Email or Password is wrong')

      const token = jwt.sign({ id: user.EmailId, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET)
      res.header('auth-token', token).send({ token })
    }
  } catch (err) {
    next(err)
    res.status(400).send({
      success: false,
      message : err
    })
  }
}

exports.execute = login
