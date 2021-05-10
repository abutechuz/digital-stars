const { fetch } = require('../database/postgres.js')
const { verify } = require('../jwt.js')

module.exports = async ({cookies: { token }}) => {
  return verify(token)
}
