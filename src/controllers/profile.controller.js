const User = require('./../models/user.model')


exports.fetchProfile = async (req, res) => {
  const profileName = req.params.profileName
  try {
    const user = await User.findOne({ profileName })
    res.status(200).send({ user })
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Unable to fetch profile details' })
  }
}

exports.saveProfile = async (req, res) => {
  const cred = req.body
  const profileName = req.params.profileName
  if (req.user.profileName !== profileName) {
    return res.status(401).send({ message: 'Unable to edit others details' })
  }
  try {
    const user = await User.findById(req.user._id)
    if (user.role === "developer") {
      user.completion = checkDetailsCompletionUser(user)
    } else {
      user.completion = checkDetailsCompletionHr(user)
    }
    user[cred[0]] = cred[1]
    const result = await user.save()
    res.status(200).send({ cred, user })
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}
exports.addReviews = async (req, res) => {
  const cred = req.body
  const profileName = req.params.profileName
  if (req.user.profileName === profileName) {
    return res.status(400).send({ message: 'Unable to review yourself' })
  }
  try {
    const user = await User.findOne({ profileName })
    if (!user) {
      throw new Error()
    }
    user[cred[0]] = cred[1]
    const result = await user.save()
    res.status(200).send({ cred, user })
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}


exports.saveResume = async (req, res) => {
  const profileName = req.params.profileName
  if (req.user.profileName !== profileName) {
    res.status(400).send({ message: 'Unable to edit others details' })
  }
  try {
    const user = await User.findById(req.user._id)
    user.resumeBuffer = req.file.buffer
    user.resume = process.env.URL + 'public/' + user._id + '/resume'
    await user.save()
    res.status(200).send({ cred: ['resume', user.resume], user })
  } catch (error) {
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}

exports.saveImage = async (req, res) => {
  const profileName = req.params.profileName
  if (req.user.profileName !== profileName) {
    res.status(400).send({ message: 'Unable to edit others details' })
  }
  try {
    const user = await User.findById(req.user._id)
    user.image = req.file.buffer
    user.imageURL = process.env.URL + 'public/' + user._id + '/image'
    await user.save()
    res.status(200).send({ cred: user.imageURL, user })
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}

exports.saveCertifications = async (req, res) => {
  const cred = req.body
  const profileName = req.params.profileName
  if (req.user.profileName !== profileName) {
    res.status(400).send({ message: 'Unable to edit others details' })
  }
  try {
    const user = await User.findById(req.user._id)
    user.certificateBuffer.push(req.file.buffer)
    const certification = {
      title: cred.title,
      certificate: process.env.URL + 'public/' + user._id + '/certificate/' + (user.certificateBuffer.length - 1).toString()
    }
    user.certifications.push(certification)
    await user.save()
    res.status(200).send({ cred: user.certifications, user })
  } catch (error) {
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}
checkDetailsCompletionUser = (user) => {
  let completion = 0
  if (user.description) {
    completion += 10
  }
  if (user.emailVerified) {
    completion += 10
  }
  if (user.username) {
    completion += 10
  }
  if (user.canJoin) {
    completion += 10
  }
  if (user.experience) {
    completion += 10
  }
  if (user.work) {
    completion += 10
  }
  if (user.skills.length) {
    completion += 10
  }
  return completion
}
checkDetailsCompletionHr = user => {
  let completion = 0
  if (user.description) {
    completion += 20
  }
  if (user.emailVerified) {
    completion += 20
  }
  if (user.username) {
    completion += 10
  }
  if (user.employees) {
    completion += 10
  }
  if (user.careerGrowth) {
    completion += 10
  }
  if (user.skills.length) {
    completion += 10
  }
  return completion
}
