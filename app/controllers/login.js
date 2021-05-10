const loginFunction = require('../Library/function/login.js')
const { sign } = require('../Library/jwt.js')

const login = ('/', async (req, res) => {
  const user = await loginFunction(req)
  try {
    const token = await sign(await user, { expiresIn: 60 * 60 * 60 })
    res.cookie('token', token).send(token)
  } catch (error) {
    res.send(error)
  }
})

module.exports = login
