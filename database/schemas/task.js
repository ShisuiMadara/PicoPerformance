const mysql = require('mysql')
const { VARCHAR } = require('mysql/lib/protocol/constants/types')
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

const taskSchema = new Schema({
  TaskId: {
    type: VARCHAR,
    required: true
  },
  EmployeeId: {
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

const task = mysql.model('task', taskSchema)

module.exports = task
