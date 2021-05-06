const faqModel = require('../models/faq.js')


module.exports = {
  GET: ('/', async (req, res) => {
    const faqs = await faqModel.getFaq(req)

    res.send(faqs)
  }),
  POST: ('/', async (req, res) => {
    const faqs = await faqModel.addFaq(req)

    res.send(faqs)
  }),
  PUT: ('/', async (req, res) => {
    const faqs = await faqModel.updateFaq(req)

    res.send(faqs)
  }),
  DELETE: ('/', async (req, res) => {
    const faqs = await faqModel.getFaq(req)

    res.send(faqs)
  })
}
