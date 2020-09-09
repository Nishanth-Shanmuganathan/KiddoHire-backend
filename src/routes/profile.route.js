const express = require('express')

const { fetchProfile, saveProfile, saveResume, saveImage, saveCertifications, addReviews } = require('./../controllers/profile.controller')


const multer = require('multer')
const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
};

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
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

const MIME_TYPE_MAP_CERTIFICATE = {
  "image/jpeg": "jpeg",
  "image/png": "png"
};


const certificateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP_CERTIFICATE[file.mimetype];
    let error = new Error("Invalid file type");
    if (isValid) {
      error = null;
    }
    cb(error, "certificate");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP_CERTIFICATE[file.mimetype];
    const filename = req.user.profileName + "_" + req.body.title + "." + ext
    const absPath = process.env.URL + "certificate/" + filename
    req.body.absPath = absPath
    cb(null, filename);
  }
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP_CERTIFICATE[file.mimetype];
    let error = new Error("Invalid file type");
    if (isValid) {
      error = null;
    }
    cb(error, "image");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP_CERTIFICATE[file.mimetype];
    const filename = req.user.profileName + "." + ext
    const absPath = process.env.URL + "image/" + filename
    req.body.absPath = absPath
    cb(null, filename);
  }
});

const profileRouter = express.Router()

profileRouter.get('/:profileName', fetchProfile)

profileRouter.patch('/:profileName', saveProfile)

profileRouter.patch('/reviews/:profileName', addReviews)

profileRouter.patch('/resume/:profileName', multer({ storage: resumeStorage }).single('resume'), saveResume)

profileRouter.patch('/image/:profileName', multer({ storage: imageStorage }).single('image'), saveImage)

profileRouter.patch('/certificate/:profileName', multer({ storage: certificateStorage }).single('certificate'), saveCertifications)

module.exports = profileRouter
