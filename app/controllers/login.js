const loginFunction = require('../library/function/login.js')
const { sign } = require('../library/function/jwt.js')

const login = ('/', async (req, res) => {
  try {
    const user = await loginFunction(req)
    const token = await sign(await user, { expiresIn: 60 * 60 * 60 })

    res.send({token , ...user})
  } catch (error) {
    res.status(401).send({message : "User is not defined"})
  }
})

module.exports = login
