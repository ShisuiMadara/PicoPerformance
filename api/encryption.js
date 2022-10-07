const User = require('../PicoPerformance/database/schemas/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mysql = require('mysql')

async function hashPassword (Password) {
  return await bcrypt.hash(Password, 10)
}

async function validatePassword (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

User.create = async (newUser) => {
  const insert = await mysql.query('INSERT INTO user SET ?', newUser)
  if (insert.insertId) {
    return insert.insertId
  }
}

User.login = async (value) => {
  const row = await mysql.query('SELECT * FROM user WHERE mobile = ? OR email = ?', [value, value])
  if (row.length) {
    return row[0]
  } else {
    console.log('User does not exist')
  }
}

async function signup (req, res, next) {
  const HashPassword = await hashPassword(req.body.Password)

  const user = new User({
    ContactNo: req.body.ContactNo,
    EmailId: req.body.EmailId,
    Name: req.body.Name,
    Password: HashPassword,
    isAdmin: 0,
    Department: req.body.Department,
    JoiningDate: req.body.JoiningDate
  })
  try {
    res.send(user)
  } catch (err) {
    next(err)
    res.status(500).send(err)
  }
}

async function login (req, res, next) {
  try {
    const user = await User.login(req.body.EmailId)
    if (user) {
      const validPass = await validatePassword(req.body.Password, user.Password)
      if (!validPass) return res.status(400).send('Email or Password is wrong')

      const token = jwt.sign({ id: user.EmailId, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET)
      res.header('auth-token', token).send({ token })
    }
  } catch (err) {
    next(err)
    res.status(400).send(err)
  }
}

module.exports = { signup, login }
