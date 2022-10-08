const mysql = require('mysql')
const randtoken = require('rand-token')
const nodemailer = require('nodemailer')

async function sendEmail (email, token) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: 'postmaster@sandboxdeed5c321f4b4978a28591a344e75fca.mailgun.org',
      pass: '1d44e38354a64d4c0a4c6da9ccbab793-381f2624-5d0adc01'
    }
  })

  const info = await transporter.sendMail({
    from: 'picoPerformance@gmail.com',
    to: email,
    subject: 'Reset Password Link - picoPerformance',
    html: '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/reset-password?token=' + token + '">link</a> to reset your password</p>'
  })

  console.log('Message sent: %s', info.messageId)

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
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
      const sent = sendEmail(email, token)
      const dataa = [[result[0].EmployeeId, email, token]]
      if (sent) {
        con.query('Insert Into Tokens Values ?', [dataa], function (err, result) {
          if (err) {
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

    // res.redirect('/')
    res.send()
  })
}

exports.execute = sendMailToEmail
