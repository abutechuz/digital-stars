const membersModel = require('../models/member.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const members = await membersModel.getMembers(req)
      res.send(members)
    } catch (error) {
      res.send(error)
    }
  },
  
  POST: async (req, res) => {
    try {
      let member_image = req.files.member_image || {mimetype: ""} ;
      let uploadPath;
      
      const {
        v4: uuidv4
      } = require('uuid');
      if (!req.files || Object.keys(req.files).length === 0 || !member_image.mimetype.match(/image/g)) {
        return res.status(400).send({message : 'File ERROR'});
      }
      
      // The name of the input field (i.e. "member_image") is used to retrieve the uploaded file
      
      var path = require('path');
      var scriptName = path.dirname(path.dirname(path.dirname(__filename)));
      
      let member_image_src;
      if (member_image.mimetype.match(/image/g) && member_image) {
        let val = uuidv4();
        uploadPath = scriptName + '/data/images/' + val;
        member_image.mv(uploadPath, function (err) {
          if (err)
          return res.status(500).send(err)
        });
        member_image_src = val
      }
      
      const member = await membersModel.insertMember(member_image_src)
      res.send(member)
    } catch (error) {
      res.send(error)
    }
  },
  
  DELETE: async (req, res) => {
    try {
      const member = await membersModel.deleteMember(req)

      res.send(member)
    } catch (error) {
      res.send(error)
    }
  }
}
