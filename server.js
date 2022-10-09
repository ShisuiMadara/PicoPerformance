// global imports
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
// load env variables
dotenv.config()
// configure server for logging.
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
  if (req.path == '/api/login' || req.path == '/api/sendingLink' || req.path == '/api/reset-password') {
    next()
    return
  }
  let token = req.header('Authorization')
  if (!token) {
    return res.status(401).send({
      message: 'Access Denied',
      success: false
    })
  }

  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    console.log(verified.isAdmin)
    if (verified.isAdmin == 0) {
      if (verified.isBlock) {
        return res.status(403).send({
          message: 'User is deactivated',
          success: false
        })
      }
      if (req.body.EmployeeId) {
        if (req.body.EmployeeId != verified.Eid) {
          return res.status(401).send({
            success: false,
            message: 'Access Denied'
          })
        }
      }
      if (req.body.EmailId) {
        console.log('aa')
        if (req.body.EmailId != verified.id) {
          return res.status(401).send({
            success: false,
            message: 'Access Denied'
          })
        }
      }
    }
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send({
      message: 'Invalid Token',
      success: false
    })
  }
})

app.set('view engine', 'ejs')

// accept all requests
app.all('*', async (req, res, func) => {
  const regex = /[/]api[/]/g
  console.log(`Incoming request from ${req.ip} to ${req.url}`)
  if (regex.test(req.url)) {
    try {
      const url = req.url
      let path = ''
      for (let i = 0; i < url.length && url[i] != '?'; i++) {
        path += url[i]
      }
      console.log(`Loading .${path}`)
      const api = require(`.${path}`)
      try {
        await api.execute(req, res)
      } catch (err) {
        console.log(`Error: ${err.message}`)
      }
    } catch (err) {
      console.log(`Failed to load .${req.url} ! \n error: ${err.message}`)
      res.status(200).json({
        success: false,
        message: err.message
      })
    }
  } else {
    res.status(200).json({
      success: false,
      message: 'Page not found ! '
    })
  }
})

// run server.
const port = process.env.PORT || 5000
app.listen(port, (req, res) => {
  console.log(`Server Running at port: ${port}`)
})

// to prevent server from crashing.
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.msg}`)
})
