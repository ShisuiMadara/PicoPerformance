const jwt = require('jsonwebtoken')

function loggedIn (req, res, next) {
  let token = req.header('Authorization')
  if (!token) return res.status(401).send('Access Denied')

  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified.isAdmin == 0) {
      if (req.EmployeeId){
        if (req.EmployeeId != verified.Eid) {
          return res.status(401).send('Access Denied')
        }
      }
      if (req.EmailId){
        if (req.EmailId != verified.id) {
          return res.status(401).send('Access Denied')
        }
      } 
    }
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

async function adminOnly (req, res, next) {
  if (req.user.user_type_id === false) {
    return res.status(401).send('Access Denied')
  }
  next()
}

module.exports({ loggedIn, adminOnly })
