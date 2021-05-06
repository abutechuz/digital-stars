const faqModel = require('../models/faq.js')
const authJWT = require('../Library/function/auth.js')

module.exports = {
  GET: ('/', async (req, res) => {
    try {
      const faqs = await faqModel.getFaq(req)

      res.send(faqs)
    } catch (error) {
      res.sendStatus(error)
    }
  }),

  POST: ('/', async (req, res) => {
    try {
      authJWT(req)
      const faqs = await faqModel.addFaq(req)

      res.send(faqs)
    } catch (error) {
      res.sendStatus(403)
    }
  }),

  PUT: ('/', async (req, res) => {
    try {
      authJWT(req)
      const faqs = await faqModel.updateFaq(req)

      res.send(faqs)
    } catch (error) {
      res.sendStatus(403)
    }
  })
}
