const { fetch } = require('../Library/database/postgres.js')

const getFaq = async (req) => {
  const SQL = `select * from faq`

  return await fetch(SQL)
}

const addFaq = async ({ body: { question, answer }}) => {
  const SQL = `insert into faq(
    faq_question,
    faq_answer
  ) values ($1, $2) returning *;`

  return await fetch(SQL, question, answer)
}

const removeFaq = async ({ body: { faq_id }}) => {
  const SQL = `delete from faq where faq_id = $1 returning *`

  return await fetch(SQL, faq_id)
}

const updateFaq = async ({ body: { faq_id, question, answer }}) => {
  const SQL = `update faq where faq_id = $1 returning *`

  return await fetch(SQL, )
}


module.exports = {
  getFaq,
  addFaq,
  removeFaq,
  updateFaq
}

