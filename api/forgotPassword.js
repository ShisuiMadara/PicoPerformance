const bcrypt = require('bcrypt')
const mysql = require('mysql')
const nodemailer = require('nodemailer')
const randtoken = require('rand-token')

async function hashPassword (Password) {
  return await bcrypt.hash(Password)
}

async function sendEmail (email, token) {
  const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EmailUser,
      pass: process.env.EmailPassword
    }
  })

  const mailOptions = {
    from: 'picoPerformance@gmail.com',
    to: email,
    subject: 'Reset Password Link - picoPerformance',
    html: '<p>You requested for reset password, kindly use this <a href="http://localhost:4000/reset-password?token=' + token + '">link</a> to reset your password</p>'

  }

  await mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error sending mail')
    }
    console.log(info)
  })
}

function resetPassword (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body
  const email = req.EmailId

  con.query('SELECT * FROM Employee WHERE EmailId ="' + email + '"', function (err, result) {
    if (err) throw err

    let type = ''
    let msg = ''

    console.log(result[0])

    if (result[0].email.length > 0) {
      const token = randtoken.generate(20)

      const sent = sendEmail(email, token)

      if (sent !== '0') {
        const data = {
          token
        }

        con.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function (err, result) {
          if (err) throw err
          res.write(result)
        })

        type = 'success'
        msg = 'The reset password link has been sent to your email address'
      } else {
        type = 'error'
        msg = 'Something goes to wrong. Please try again'
      }
    } else {
      console.log('2')
      type = 'error'
      msg = 'The Email is not registered with us'
    }

    req.flash(type, msg)
    res.redirect('/')
    res.send()
  })
}

function updatePassword (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body

  const token = req.body.token
  const password = req.body.password

  con.query('SELECT * FROM Employee WHERE token ="' + token + '"', function (err, result) {
    if (err) throw err

    const PasswordHash = hashPassword(password)

    
  })
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

exports.execute = forgotPassword
