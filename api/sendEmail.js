const nodemailer = require('nodemailer')

export async function sendEmail (email, token) {
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

exports.execute = sendEmail
