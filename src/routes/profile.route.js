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
    req.body.absPath = absPath
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

const profileRouter = express.Router()

profileRouter.get('/:profileName', fetchProfile)

profileRouter.patch('/:profileName', saveProfile)

profileRouter.patch('/reviews/:profileName', addReviews)



const image = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
      return cb(new Error('Invalid file format'))
    }
    cb(undefined, true)
  }
})

profileRouter.patch('/image/:profileName', image.single('image'), saveImage,
  (error, req, res, next) => {
    res.status(400).send({
      message: error.message
    })
  })

profileRouter.patch('/certificate/:profileName', image.single('certificate'), saveCertifications,
  (error, req, res, next) => {
    res.status(400).send({
      message: error.message
    })
  })

const resume = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/i)) {
      return cb(new Error('Invalid file format'))
    }
    cb(undefined, true)
  }
})

profileRouter.patch('/resume/:profileName', resume.single('resume'), saveResume,
  (error, req, res, next) => {
    res.status(400).send({
      message: error.message
    })
  })


module.exports = profileRouter
