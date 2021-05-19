const slidesModel = require('../models/slide.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const slides = await slidesModel.getSlides(req)
      res.send(slides)
    } catch (error) {
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {
      let slide_image;
      let uploadPath;

      const {
        v4: uuidv4
      } = require('uuid');
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "slide_image") is used to retrieve the uploaded file

      var path = require('path');
      var scriptName = path.dirname(path.dirname(path.dirname(__filename)));

      slide_image = req.files.slide_image;

      let slide_image_src;
       if (slide_image.mimetype.match(/image/g) && slide_image) {
        let val = uuidv4();
        uploadPath = scriptName + '/data/images/' + val;
        slide_image.mv(uploadPath, function (err) {
          if (err)
            return res.status(500).send(err)
        });
        slide_image_src = val
      }

      const slide = await slidesModel.insertSlide(req, slide_image_src)
      res.send(slide)
    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const slide = await slidesModel.deleteSlide(req)

      res.send(slide)
    } catch (error) {
      res.send(error)
    }
  }
}