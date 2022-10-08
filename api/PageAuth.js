const jwt = require('jsonwebtoken')

function loggedIn (req, res, next) {
  let token = req.header('Authorization')
  if (!token) return res.status(401).send('Access Denied')

  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    if (verified.user_type_id === false) {
      const reqUrl = req.baseUrl + req.route.path
      if (reqUrl.includes('users/:id') && parseInt(req.params.id) !== verified.id) {
        return res.status(401).send('Unauthorized!')
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
