const mysql = require('mysql')
const Schema = mysql.schema

const con = mysql.createConnection({
  host: 'localhost',
  user: 'pico',
  password: 'password'
})

con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

const userSchema = new Schema({
  EmailId: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'supervisor', 'admin']
  },
  accessToken: {
    type: String
  }
})

const user = mysql.model('task', userSchema)

module.exports = user
