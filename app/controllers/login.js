const loginFunction = require('../Library/function/login.js')
const { sign } = require('../Library/jwt.js')

const login = ('/', async (req, res) => {
  try {
    const user = await loginFunction(req)
    const token = sign(user, { expiresIn: 60 * 60 * 60 })

    console.log(user)
    res.cookie('token', token).end()
  } catch (error) {
    res.send(error)
  }
})

module.exports = login
