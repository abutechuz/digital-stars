const AdminModel = require('../models/admin.js')
const authJWT = require('../library/function/auth')


module.exports = {
  GET: async (req, res) => {
    try {
      authJWT(req)
      const admins = await AdminModel.getAdmins(req)

      res.send(admins)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },
  POST: async (req, res) => {
    try {
      authJWT(req)
      const admin = await AdminModel.insertAdmin(req)

      res.send(admin)
    } catch (error) {
      res.send(error)
    }
  },
  PUT: async (req, res) => {
    try {
      authJWT(req)
      const returning = await AdminModel.setAdmin(req)

      res.send(returning)
    } catch (error) {
      res.send(error)
    }
  },
  DELETE: async (req, res) => {
    try {
      authJWT(req)
      const admin = await AdminModel.deleteAdmin(req)

      res.send(admin)
    } catch (error) {
      res.send(error)
    }
  },
}
