const { verify } = require('../jwt.js')

module.exports = ({ cookies: { token }}) => {
  try {
    return verify(token)
  } catch (error) {

    throw new Error({
      message: error.message,
    })
  }
}
