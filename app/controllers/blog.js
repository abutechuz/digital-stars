const blogsModel = require('../models/blog.js')

module.exports = {
  GETBYID: async (req, res) => {
    try {
      const blog = await blogsModel.getById(req)

      res.send(blog)
    } catch (error) {
      res.status(401).send(error)
    }
  },
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
      let blog_image;
      let blog_author_picture;
      let uploadPath;

      const {
        v4: uuidv4
      } = require('uuid');
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "blog_image") is used to retrieve the uploaded file

      var path = require('path');
      var scriptName = path.dirname(path.dirname(path.dirname(__filename)));

      blog_image = req.files.blog_image;
      blog_author_picture = req.files.blog_author_picture;

      let blog_image_src;
      if (blog_image.length > 1 && blog_image) {
        if (blog_image[0].mimetype.match(/image/g)) {
          let val = uuidv4();
          uploadPath = scriptName + '/data/images/' + val;
          obj.mv(uploadPath, function (err) {
            if (err)
              return res.status(500).send(err)
          });
          blog_image_src = val
        }
      } else if (blog_image.mimetype.match(/image/g) && blog_image) {
        let val = uuidv4();
        uploadPath = scriptName + '/data/images/' + val;
        blog_image.mv(uploadPath, function (err) {
          if (err)
            return res.status(500).send(err)
        });
        blog_image_src = val
      }

      let blog_author_picture_src;
      if (blog_author_picture.length > 1 && blog_author_picture) {
        if (blog_author_picture[0].mimetype.match(/image/g)) {
          let val = uuidv4();
          uploadPath = scriptName + '/data/images/' + val;
          obj.mv(uploadPath, function (err) {
            if (err)
              return res.status(500).send(err)
          });
          blog_author_picture_src = val
        }
      } else if (blog_author_picture.mimetype.match(/image/g) && blog_author_picture) {
        let val = uuidv4();
        uploadPath = scriptName + '/data/images/' + val;
        blog_author_picture.mv(uploadPath, function (err) {
          if (err)
            return res.status(500).send(err)
        });
        blog_author_picture_src = val
      }

      const blogs = await blogsModel.insertBlog(req, blog_image_src , blog_author_picture_src)
      res.send(blogs)
    } catch (error) {
      console.log(error)
      res.sendStatus(403)
    }
  },

  PUT: async (req, res) => {
    try {
      const returning = await blogsModel.setBlog(req)

      res.send(returning)
    } catch (error) {
      res.sendStatus(403)
    }
  },

  DELETE: async (req, res) => {
    try {
      const blog = await blogsModel.deleteBlog(req)

      res.send(blog)
    } catch (error) {
      res.sendStatus(403)
    }
  }
}
