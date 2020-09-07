const Cryptr = require('cryptr')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./../models/user.model')

const { registrationMail } = require('./../mails/registration.mail')

exports.loginController = async (req, res) => {
  const email = req.body.email.trim()
  const password = req.body.password.trim()
  try {
    const user = await User.findOne({ email })
    if (!user) throw new Error()
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error()
    if (req.header('Authorization')) {
      const token = req.header('Authorization').replace('Bearer ', '')
      if (user.token === token) {
        return res.status(200).send({ token, user })
      }
    }
    console.log(process.env.JWT_STRING);
    const token = jwt.sign({ id: user._id }, process.env.JWT_STRING)
    user.token = token
    await user.save()
    res.status(200).send({ message: 'Login successful...', token, user })
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Authentication failed' })
  }
}

exports.registerEmail = async (req, res) => {
  const email = req.body.email.trim()
  const password = req.body.password.trim()
  const confirmPassword = req.body.confirmPassword.trim()
  const role = req.body.role.trim()
  if (password !== confirmPassword) {
    return res.status(400).send({ message: 'Password mismatch' })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = new User({
      email,
      password: hashedPassword,
      role
    })
    const token = jwt.sign({ id: user._id }, process.env.JWT_STRING)

    //generating unique username by taking first and last 3 digits of _id, if already present altering accordingly
    const first = user._id.toString().slice(0, 3)
    const last = user._id.toString().slice(user._id.toString().length - 3)
    const name = user.email.split('@')[0]
    let profileName = name + last + first;
    let alreadyExists = true;
    let count = 0;
    profileName += count
    while (alreadyExists) {
      alreadyExists = await User.findOne({ profileName })
      if (alreadyExists) {
        profileName = profileName.slice(0, profileName.length - count.toString().length) + count
      }
    }

    user.profileName = profileName
    user.token = token
    const secretCode = hashedPassword.substr(0, 3) + hashedPassword.substr(hashedPassword.length - 3, 3)
    await registrationMail(email, user.profileName, secretCode)
    const result = await user.save()
    res.status(200).send({ message: 'Activation link sent to registered mail id...', token, user })

  } catch (error) {
    // console.log(error);
    if (error.message.includes('User validation failed')) {
      res.status(400).send({ message: 'Email-Id already exists' })
    }
    res.send({ message: 'Registration failed. Please register again...' })
  }
}

exports.verifyEmail = async (req, res, next) => {
  const userKey = req.params.key
  const user = req.user
  const key = user.password.substr(0, 3) + user.password.substr(user.password.length - 3, 3)
  if (key === userKey) {
    try {
      const dbUser = await User.findById(user._id)
      dbUser.emailVerified = true
      res.status(200).send({ message: 'Email verified...', user })
    } catch (error) {
      res.status(400).send({ message: 'Unable to fetch user...' })
    }
  } else {
    console.log('ihi');
    res.status(401).send({ message: 'Invalid link...' })
  }
}

exports.authentication = async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  try {
    const { id } = jwt.decode(token)
    const user = await User.findOne({ _id: id })
    if (!user || user.token !== token) throw new Error('Authentication failed')
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'Authentication failed' })
  }
}

exports.logout = async (req, res) => {
  const id = req.user._id
  try {
    const user = await User.findById(id)
    user.token = ''
    await user.save()
    res.status(200).send({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(400).send({ message: 'Cannot logout' })
  }
}

