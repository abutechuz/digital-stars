const NumberModel = require('../models/numbers.js')

module.exports = {
  POST: async (req, res) => {
    try {
      const number = await NumberModel.insertNumber(req)

      res.send(number)
    } catch (error) {
      res.send(error)
    }
  },

  GET: async (req, res) => {
    try {
      const numbers = await NumberModel.getNumbers(req)

      res.send(numbers)
    } catch (error) {
      res.send(error)
    }
  }
}
