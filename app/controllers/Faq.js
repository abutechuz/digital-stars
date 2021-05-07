const faqModel = require('../models/faq.js')
const authJWT = require('../Library/function/auth.js')

module.exports = {
  GET: ('/', async (req, res) => {
    try {
      await authJWT(req)

      const faqs = await faqModel.getFaq(req)

      res.send(faqs)
    } catch (error) {
      res.send(error)
    }
  }),

  POST: ('/', async (req, res) => {
    try {
      authJWT(req)
      const faqs = await faqModel.addFaq(req)

      res.send(faqs)
    } catch (error) {
      console.error(error)
      res.sendStatus(401)
    }
  }),

  PUT: ('/', async (req, res) => {
    try {
      authJWT(req)

      const faqs = await faqModel.updateFaq(req)

      res.send(faqs)
    } catch (error) {
      res.sendStatus(401)
    }
  })
}
