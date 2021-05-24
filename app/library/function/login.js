const { fetchOne } = require('../database/postgres.js')

module.exports.login = async ({ login, password }) => {
  const SQL = `select user_id, user_login from users where user_login = $1 and user_password = crypt($2, user_password)`

  return await fetchOne(SQL, login, password)
}

module.exports.verify = async (user_id) => {
  const SQL = `select * from users where user_id = $1`

  return await fetchOne(SQL, user_id)
}
