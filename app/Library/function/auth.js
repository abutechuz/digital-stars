const {
  fetch
} = require('../database/postgres.js')
const {
  verify
} = require('../jwt.js')

module.exports = async ({
  cookies: {
    token
  }
}) => {
  try {
    const SQL = `select * from users where user_id =$1`
    let JWT = await verify(token)
    if (fetch(SQL, JWT.user_id)) {
      return JWT
    } else {
      throw new Error({
        message: 'This user is not defined',
      })
    }
  } catch (error) {
    throw new Error({
      message: error.message,
    })
  }
}