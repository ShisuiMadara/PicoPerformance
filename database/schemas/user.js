const mysql = require('mysql')
const Schema = mysql.schema

const userSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  EmailId: {
    type: String,
    required: true
  },
  ContactNo: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  JoiningDate: {
    type: Date,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  IsAdmin: {
    type: Boolean,
    default: false
  }
})

const user = mysql.model('Employee', userSchema)

module.exports = user
