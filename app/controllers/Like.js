const LikeModel = require('../models/like.js')
const authJWT = require('../Library/function/auth.js')

module.exports = {
  POST: async (req, res) => {
    try {
      // authJWT(req)
      const likes = await LikeModel.insertLike(req)

      res.send(likes)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      // authJWT(req)
      const like = await LikeModel.deleteLike(req)

      res.send(like)
    } catch (error) {
      res.send(error)
    }
  },
}
