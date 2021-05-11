const faqModel = require('../models/faq.js')

module.exports = {
  GET: ('/', async (req, res) => {
    try {
      const faqs = await faqModel.getFaq(req)

      res.send(faqs)
    } catch (error) {
      res.status(401).send(error)
    }
  }),

  POST: ('/', async (req, res) => {
    try {
      const faqs = await faqModel.addFaq(req)

      res.send(faqs)
    } catch (error) {
      res.status(401).send(error)
    }
  }),

  PUT: ('/', async (req, res) => {
    try {
      const faqs = await faqModel.updateFaq(req)

      res.send(faqs)
    } catch (error) {
      res.status(401).send(error)
    }
  })
}
