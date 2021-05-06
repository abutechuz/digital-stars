const readF = require("util").promisify(require("fs").readFile)
const writeF = require("util").promisify(require("fs").writeFile)
const path = require("path").resolve("info.json")
const authJWT = require('../Library/function/auth')


module.exports = {
  GET: async (req, res) => {
    try {
      const infos = JSON.parse(await readF(path), "utf8")

      res.send(infos)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },
  POST: async ({
    body: {
      address,
      about,
      phone_number,
      email,
      yt_video_link,
      google_form_link
    }
  }, res) => {
    try {
      // authJWT(req)
      const blogs = await writeF(path, JSON.stringify({
        address,
        about,
        phone_number,
        email,
        yt_video_link,
        google_form_link
      }))

      res.send(JSON.parse(await readF(path), "utf8"))
    } catch (error) {
      res.send(error)
    }
  },
}