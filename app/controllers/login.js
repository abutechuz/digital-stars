const loginFunction = require('../library/function/login.js')
const { sign } = require('../library/jwt.js')

const login = ('/', async (req, res) => {
  try {
    const user = await loginFunction(req)
    const token = await sign(await user, { expiresIn: 60 * 60 * 60 })
    res.cookie('token', token ,{ httpOnly: true }).send(token)
  } catch (error) {
    res.status(401).send(error)
  }
})

module.exports = login
