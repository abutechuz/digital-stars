const { fetch, fetchOne } = require('../library/database/postgres.js')

const getFaq = async (req) => {
  const SQL = `select * from faq`

  return await fetch(SQL)
}

const addFaq = async ({ body: { question, answer } }) => {
  const SQL = `insert into faq(
    faq_question,
    faq_answer
  ) values ($1, $2) returning *;`

  return await fetchOne(SQL, question, answer)
}

module.exports = {
  getFaq,
  addFaq
}
