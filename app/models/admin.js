let { fetch, fetchOne } = require("../library/database/postgres")

const getAdmins = async ({query : {page , limit}}) => {

  const SQL = `select user_id,user_login from user
  order by user_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`

  const users = await fetch(SQL, page, limit)

  return users
}

const insertAdmin = async ({ body: { user_login, user_password } }) => {

  const SQL = `insert into users (user_login , user_password ) values ($1, crypt($2,gen_salt('bf')) ) returning *`

  const response = await fetchOne(SQL, user_login, user_password)

  return response
}

const setAdmin = async ({ body: { user_password, user_login, user_id } }) => {

  const SQL = `update users set user_password=crypt($1 , gen_salt('bf')) , user_login=$2  where user_id=$3 returning *`

  const res = await fetchOne(SQL, user_password, user_login, user_id)

  return res
}

const deleteAdmin = async ({ body: { user_id } }) => {

  const SQL = `DELETE FROM users
  WHERE user_id=$1 returning *;`

  const user = await fetchOne(SQL, user_id)

  return user
}

module.exports = {
  getAdmins,
  insertAdmin,
  setAdmin,
  deleteAdmin
}
