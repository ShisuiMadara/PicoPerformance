const mysql = require('mysql')
const randtoken = require('rand-token')
const nodemailer = require('nodemailer')

async function sendEmail (email, token) {
  console.log(process.env.EmailUser)
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
    html: '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/reset-password?token=' + token + '">link</a> to reset your password</p>'

  }

  await mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error sending mail')
    }
    console.log(info)
  })
}

function sendMailToEmail (req, res) {
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

    console.log(result[0])

    if (result[0].EmailId.length > 0) {
      const token = randtoken.generate(20)
      console.log('cc')
      const sent = sendEmail(email, token)
      const dataa = [[result[0].EmployeeId, email, token]]
      if (sent) {
        con.query('Insert Into Tokens Values ?', [dataa], function (err, result) {
          if (err){
            console.log(err.message)
          }
          res.write(result)
        })

        console.log('Email sent successfully')
      } else {
        res.status(400).send('Something went wrong. Kindly try again')
      }
    } else {
      res.status(404).send('EmailId not found. Kindly signUp.')
    }

    //res.redirect('/')
    res.send()
  })
}

exports.execute = sendMailToEmail
