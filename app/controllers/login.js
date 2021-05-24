const loginFunction = require('../library/function/login.js')
const { sign , verify } = require('../library/function/jwt.js')

const login = ('/', async (req, res) => {
  try {
    const user = await loginFunction.login(req.body)
    const token = await sign(await user, { expiresIn: 60 * 60 * 60 })

    res.send({token , ...user})
  } catch (error) {
    res.status(401).send({message : "User is not defined"})
  }
})

const check = ('/' , async (req,res)=> {
  try {
    const user = await verify(req.headers.token ,async function(err, user) {
      if(!err){
        const verif = await loginFunction.verify(user.user_id)
        if(verif){
          res.status(200).send({
            message : 'OK'
          })
        }else {
          res.status(401).send({
            message : "User is not defined"
          })
        }
      }else{
        res.status(401).send({
          message : err.message
        })
      }
    })

  } catch (error) {
    res.status(401).send({message : "User is not defined"})
  }
})

module.exports.login = login
module.exports.check = check

