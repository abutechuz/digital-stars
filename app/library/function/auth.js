const { verify } = require('./jwt.js')
const { fetchOne } = require('../database/postgres.js')

const auth = async (req , res , next , norequired_methods) => {
  if(! Array.isArray(norequired_methods)){
    norequired_methods = []
  }
  if(! norequired_methods.includes(req.method)){
    verify(req.headers.token ,async (err, user) => {
      if (err) {
        return res.status(403).json(err).end();
      } else if (! await fetchOne(`select * from users where user_id=$1` , user.user_id)){
        return res.status(404).json({"message" : "User is not defined"}).end()
      }else {
        next()
      }
    });
  } else {
    next()
  }
}

module.exports = auth
