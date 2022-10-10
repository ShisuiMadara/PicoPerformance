// const User = require('G:/Projects/PicoPerformance/database/schemas/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
// done
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
        message: 'Database Error'
      })
      return 0
    }
    console.log('Connected!')
    const sql = 'SELECT * FROM Employee WHERE EmailId = "' + value + '"'
    con.query(sql, async function (erro, result) {
      if (erro) {
        res.status(400).send({
          success: false,
          message: 'Unknown Error'
        })
        console.log(erro.message)
        con.end()
        return 0
      }
      if (result.length === 0) {
        return res.status(400).send({
          success: false,
          message: 'Email ID or Password is Wrong!'
        })
      }
      const user = result[0]
      if (user) {
        console.log(user)
        if (user.IsBlocked) {
          return res.status(403).send({
            success: false,
            message: 'User is Blocked'
          })
        }
        console.log(req.body.Password)
        const validPass = await validatePassword(req.body.Password, user.PasswordHash)
        if (!validPass) {
          res.status(400).send({
            success: false,
            message: 'Email ID or Password is Wrong!'
          })
          con.end()
          return 0
        }

        const token = jwt.sign({ id: user.EmailId, Eid: user.EmployeeId, isAdmin: user.IsAdmin, isBlock: user.IsBlocked }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.send({
          success: true,
          data: {
            token,
            Name: user.Name,
            EmailId: user.EmailId,
            IsAdmin: user.IsAdmin,
            ContactNo: user.ContactNo,
            Department: user.Department,
            JoiningDate: user.JoiningDate,
            EmployeeId: user.EmployeeId
          }
        })
        con.end()
      }
    })
  })
}

async function login (req, res, next) {
  try {
    const user = await Login(req, res, req.body.EmailId)
  } catch (err) {
    next(err)
    res.status(400).send({
      success: false,
      message: err
    })
  }
}

exports.execute = login
