const blogsModel = require('../models/blog.js')
// const authJWT = require('../library/function/auth.js')

module.exports = {
  GETBYID: ('getuser', async (req, res) => {
    try {
      // await authJWT(req)

      const blog = await blogsModel.getById(req)

      res.send(blog)
    } catch (error) {
      res.status(401).send(error)
    }
  }),
  GET: async (req, res) => {
    try {
      const blogs = await blogsModel.getBlogs(req)
      res.send(blogs)
    } catch (error) {
      console.log(error)
      res.sendStatus(403)
    }
  },
  POST: async (req, res) => {
    try {
      authJWT(req)

      // upload image

      let sampleFile;
      let uploadPath;

      const {
        v4: uuidv4
      } = require('uuid');

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

      var path = require('path');
      var scriptName = path.dirname(path.dirname(path.dirname(__filename)));

      sampleFile = req.files.sampleFile;
      let imgSrc;
      if (sampleFile.length > 1 && sampleFile) {
        if (sampleFile[0].mimetype.match(/image/g)) {
          let val = uuidv4();
          uploadPath = scriptName + '/data/images/' + val;
          obj.mv(uploadPath, function (err) {
            if (err)
              return res.status(500).send(err)
          });
          imgSrc = val
        }
      } else if (sampleFile.mimetype.match(/image/g) && sampleFile) {
        let val = uuidv4();
        uploadPath = scriptName + '/data/images/' + val;
        sampleFile.mv(uploadPath, function (err) {
          if (err)
            return res.status(500).send(err)
        });
        imgSrc = val
      }
      const blogs = await blogsModel.insertBlog(req, imgSrc)
      res.send(blogs)
    } catch (error) {
      console.log(error)
      res.sendStatus(403)
    }
  },
  PUT: async (req, res) => {
    try {
      authJWT(req)
      const returning = await blogsModel.setBlog(req)

      res.send(returning)
    } catch (error) {
      res.sendStatus(403)
    }
  },
  DELETE: async (req, res) => {
    try {
      authJWT(req)
      const blog = await blogsModel.deleteBlog(req)

      res.send(blog)
    } catch (error) {
      res.sendStatus(403)
    }
  },
}