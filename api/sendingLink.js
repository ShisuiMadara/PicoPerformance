const mysql = require('mysql')
const randtoken = require('rand-token')
const nodemailer = require('nodemailer')

async function sendEmail (email, token) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: 'STARTTLS',
    auth: {
      user: process.env.UserEmail,
      pass: process.env.UserPassword
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

    if (result[0].email.length > 0) {
      const token = randtoken.generate(20)

      const sent = sendEmail(email, token)

      if (sent) {
        con.query('UPDATE Tokens SET Token = "' + token + '" WHERE EmailId ="' + email + '"', function (err, result) {
          if (err) throw err
          res.write(result)
        })

        console.log('Email sent successfully')
      } else {
        res.status(400).send('Something went wrong. Kindly try again')
      }
    } else {
      res.status(404).send('EmailId not found. Kindly signUp.')
    }

    res.redirect('/')
    res.send()
  })
}

exports.execute = sendMailToEmail
