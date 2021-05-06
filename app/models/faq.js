const { fetch } = require('../Library/database/postgres.js')

const getFaq = async (req) => {
  const SQL = `select * from faq`

  return await fetch(SQL)
}

module.exports = {
  getFaq
}

