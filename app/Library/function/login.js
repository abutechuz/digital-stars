const { fetchOne } = require('../database/postgres.js')

module.exports = async ({ body: { login, password }}) => {
  const SQL = `select user_id, user_login from users where user_login = $1 and user_password = crypt($2, user_password)`

  return await fetchOne(SQL, login, password)
}
