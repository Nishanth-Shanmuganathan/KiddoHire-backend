const express = require('express')

const { fetchProfile, saveProfile, saveResume } = require('./../controllers/profile.controller')


const multer = require('multer')
const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('absPath');
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid file type");
    if (isValid) {
      error = null;
    }
    cb(error, "resume");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    const filename = req.user.profileName + "." + ext
    const absPath = process.env.URL + "resume/" + filename
    console.log(absPath);
    req.body.absPath = absPath
    console.log(req.body);
    cb(null, filename);
  }
});

const profileRouter = express.Router()

profileRouter.get('/:profileName', fetchProfile)

profileRouter.patch('/:profileName', saveProfile)

profileRouter.patch('/resume/:profileName', multer({ storage }).single('resume'), saveResume)

module.exports = profileRouter
