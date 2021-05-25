let { fetch, fetchOne } = require("../library/database/postgres")

let read = require("reading-time")

const getMembers = async () => {
  const SQL = `
  select * from members
  `

  const members = await fetch(SQL)

  return members
};

const insertMember = async (slide_image_src) => {

  const SQL = `insert into members ( member_img ) values ( $1 ) returning *`

  const response = await fetchOne(SQL,slide_image_src)

  return response
}


const deleteMember = async ({
  body: {
    member_id
  }
}) => {

  const SQL = `DELETE FROM members WHERE member_id=$1 returning *;`

  const member = await fetchOne(SQL, member_id)

  return member
}

module.exports = {
  getMembers,
  insertMember,
  deleteMember
}
