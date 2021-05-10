const loginFunction = require('../library/function/login.js')
const { sign } = require('../library/jwt.js')

const login = ('/', async (req, res) => {
  try {
    const user = await loginFunction(req)
    const token = sign(user, { expiresIn: '4h' })

    res.cookie('token', token, { httpOnly: true }).end()
  } catch (error) {
    res.status(401).send(error)
  }
})

module.exports = login
