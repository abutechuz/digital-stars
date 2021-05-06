const { verify } = require('../jwt.js')

module.exports = ({ cookies: { token }}) => {
  try {
    return await verify(token)
  } catch (error) {
    throw new Error(error)
  }
}
