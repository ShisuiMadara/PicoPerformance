const mysql = require('mysql')
const randtoken = require('rand-token')
const nodemailer = require('nodemailer')
// done
async function sendEmail (email, token) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  })

  const info = await transporter.sendMail({
    from: 'picoPerformance@gmail.com',
    to: email,
    subject: 'Reset Password Link - picoPerformance',
    html: '<p>You requested for reset password, kindly use this <a href="http://picoperformance.centralindia.cloudapp.azure.com:3000/reset-password?token=' + token + '">link</a> to reset your password</p>'
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

    console.log(result.length)
    if (result.length != 0 && result[0].EmailId.length > 0) {
      const token = randtoken.generate(20)
      const sent = sendEmail(email, token)
      const dataa = [[result[0].EmployeeId, email, token]]
      if (sent) {
        con.query('DELETE FROM Tokens WHERE EmailId = "' + email + '"', function (err, result) {
          if (err) {
            console.log(err.message)
            res.status(400).send({
              message: 'Something went wrong. Kindly try again',
              success: false
            })
          }
        })
        con.query('Insert Into Tokens Values ?', [dataa], function (err, result) {
          if (err) {
            console.log(err.message)
            res.status(400).send({
              message: 'Something went wrong. Kindly try again',
              success: false
            })
          }
          res.write(result)
        })

        console.log('Email sent successfully')
      } else {
        return res.status(400).send({
          message: 'Something went wrong. Kindly try again',
          success: false
        })
      }
    } else {
      return res.status(404).send({
        message: 'EmailId not found. Kindly signUp.',
        success: false
      })
    }

    // res.redirect('/')
    res.send({
      message: 'Email with reset link has been sent',
      success: true
    })
    con.end()
  })
}

exports.execute = sendMailToEmail
