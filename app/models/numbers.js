let { fetch, fetchOne } = require("../library/database/postgres")

let read = require("reading-time")

const getNumbers = async ({
  query: {
    page,
    limit
  }
}) => {
  const SQL = `
  select * from numbers
  order by number_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;
  `

  const numbers = await fetch(SQL, page, limit)

  return numbers
};

const insertNumber = async ({
  body: {number}
}) => {
  const SQL = `insert into numbers ( number_val ) values ($1) returning *`
  if (/(?:[9]{2}[8][0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2})/.test(number) && number){
    const response = await fetchOne(SQL,number)

    return response
  }else{
    return new Error("False")
  }
}

module.exports = {
  getNumbers,
  insertNumber
}
