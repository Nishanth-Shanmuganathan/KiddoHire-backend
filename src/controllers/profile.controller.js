const User = require('./../models/user.model')


exports.fetchProfile = async (req, res) => {
  const profileName = req.params.profileName
  try {
    const user = await User.findOne({ profileName })
    res.status(200).send({ user })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to fetch profile details' })
  }
}

exports.saveProfile = async (req, res) => {
  const cred = req.body
  console.log('cred');
  const profileName = req.params.profileName
  console.log(req.user.profileName, profileName);
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
    console.log(result.reviews);
    res.status(200).send({ cred, user })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}
exports.addReviews = async (req, res) => {
  const cred = req.body
  const profileName = req.params.profileName
  console.log(req.user.profileName, profileName);
  if (req.user.profileName === profileName) {
    return res.status(400).send({ message: 'Unable to review yourself' })
  }
  try {
    const user = await User.findOne({ profileName })
    console.log(user);
    if (!user) {
      throw new Error()
    }
    user[cred[0]] = cred[1]
    const result = await user.save()
    console.log(result.reviews);
    res.status(200).send({ cred, user })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}


exports.saveResume = async (req, res) => {
  const cred = req.body
  const profileName = req.params.profileName
  console.log(cred);
  if (req.user.profileName !== profileName) {
    res.status(400).send({ message: 'Unable to edit others details' })
  }
  try {
    if (!cred.absPath) { throw new Error() }
    const user = await User.findById(req.user._id)
    user.resume = cred.absPath
    await user.save()
    res.status(200).send({ cred: ['resume', cred.absPath], user })
  } catch (error) {
    res.status(400).send({ message: 'Unable to save profile details' })
  }
}

exports.saveImage = async (req, res) => {
  const cred = req.body
  const profileName = req.params.profileName
  console.log(cred);
  if (req.user.profileName !== profileName) {
    res.status(400).send({ message: 'Unable to edit others details' })
  }
  try {
    if (!cred.absPath) { throw new Error() }
    const user = await User.findById(req.user._id)
    user.imageURL = cred.absPath
    await user.save()
    res.status(200).send({ cred: ['profile picture', cred.absPath], user })
  } catch (error) {
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
    user.certifications.push({ title: cred.title, certificate: cred.absPath })
    await user.save()
    res.status(200).send({ cred: ['certificate', cred], user })
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
