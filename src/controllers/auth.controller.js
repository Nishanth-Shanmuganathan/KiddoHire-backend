const Cryptr = require('cryptr')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const request = require('request')


const cryptr = new Cryptr(env.SG_API)


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
      if (user.tokens === token) {
        return res.status(200).send({ token, user })
      }
    }
    const token = jwt.sign({ id: user._id }, process.env.ENCODE_STRING)
    user.tokens = token
    await user.save()
    res.status(200).send({ token, user })
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Authentication failed' })
  }
}

exports.registerEmail = async (req, res) => {
  const email = req.body.email.trim()
  const password = req.body.password.trim()
  const confirmPassword = req.body.confirmPassword.trim()
  if (password !== confirmPassword) {
    return res.status(400).send({ message: 'Password mismatch' })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 8)
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    const user = new User({
      email,
      password: hashedPassword,
      otp
    })
    const token = jwt.sign({ id: user._id }, process.env.ENCODE_STRING)

    user.tokens = token

    console.log('send');
    await otpMail(req.body.email, otp)
    console.log('save');
    await user.save()
    res.status(200).send({ token })
  } catch (error) {
    if (error.message.includes('User validation failed')) {
      res.status(400).send({ message: 'Email-Id already exists' })
      console.log(error.message);

    }
  }
}


exports.registerCredentials = async (req, res) => {
  const user = req.user
  const details = req.body
  user.username = details.username.trim()
  user.mobile = details.mobile.trim()
  user.country = details.country.trim()
  user.city = details.city.trim()
  user.role = details.role.trim()
  for (const key in details.professional) {
    if (details.professional.hasOwnProperty(key)) {
      if (typeof details.professional[key] == 'string') {
        details.professional[key] = details.professional[key].trim()
      }
    }
  }
  user.roleDetails = details.professional
  try {
    await user.save()
    res.status(200).send({ message: 'Registration successful', user })
  } catch (error) {
    res.status(400).send({ message: 'Registration unsuccessful' })
  }

}

// exports.resendOtp = async (req, res) => {
//   const user = req.user
//   try {
//     if (user.tokens === token) {
//       await otpMail(user.email, user.otp)
//       res.status(200).send({ mesage: 'OTP sent successfully' })
//     } else {
//       res.status(400).send({ message: 'Authentication denied' })
//     }
//   } catch (error) {
//     res.status(400).send(error.message)
//   }

// }

// exports.verifyOtp = async (req, res) => {
//   const otp = req.body.otp
//   const user = req.user
//   try {
//     if (user.otp === otp) {
//       user.otp = undefined
//       user.emailVerified = true
//       await user.save()
//       res.status(200).send({ mesage: 'OTP sent successfully' })
//     } else {
//       res.status(400).send({ message: 'Authentication denied' })
//     }
//   } catch (error) {
//     res.status(400).send(error.message)
//   }
// }

exports.authentication = async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const otp = req.body.otp
  try {
    const { id } = jwt.decode(token)
    const user = await User.findOne({ _id: id })
    if (!user || user.tokens !== token) throw new Error('Authentication failed')
    req.user = user
    next()
  } catch (error) {
    // console.log(error)
    res.status(400).send({ message: 'Authentication failed' })
  }
}

// exports.countriesList = (req, res) => {
//   const search = req.params.search
//   const formattingCountryList = body => {
//     const countries = []
//     body.forEach(ele => {
//       const country = {}
//       country['name'] = ele['name']
//       country['code'] = ele['callingCodes'][0]
//       countries.push(country)
//     })
//     return countries
//   }
//   // console.log('https://api.mapbox.com/geocoding/v5/mapbox.places/' + search + '.json');
//   request({ url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + search + '.json?access_token=pk.eyJ1IjoibmlzaGFudGgwNSIsImEiOiJja2FmbGFocWwyNzNiMnZzOTEwNXJ2YXhwIn0._YYw0z0qyiSba5q1TCu7Mg', json: true }, (err, data) => {
//     if (!err) {
//       res.status(200).send({ data: data.body.features })
//     }
//   })
// }


exports.logout = async (req, res) => {
  const id = req.user._id
  try {
    const user = await User.findById(id)
    user.tokens = ''
    await user.save()
    res.status(200).send({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(400).send({ message: 'Cannot logout' })
  }
}


exports.getUser = async (req, res) => {
  const userId = req.params.userId
  if (userId) {
    try {
      const user = await User.findById(userId)
      res.status(200).send({ user })
    } catch (error) {
      res.status(404).send({ message: 'User not found' })
    }
  } else if (req.user) {
    res.status(200).send({ user: req.user })
  } else {
    res.status(400).send({ message: 'Authentication denied' })
  }
}

exports.check = async (req, res, next) => {
  var unirest = require("unirest");
  var fs = require("fs");
  var path = require("path");
  const user = "employee"
  try {
    const data1 = require(path.join(__dirname, '..', '..', 'public', 'data/hiring-trends.json'))
    const firstLabelData1 = '2020'
    const secondLabelData1 = '2019'
    const firstValueData1 = data1.map(ele => ele[firstLabelData1])
    const secondValueData1 = data1.map(ele => ele[secondLabelData1])
    const chartLabel1 = data1.map(ele => ele.Week)
    const result1 = []
    result1.push({ data: firstValueData1, label: firstLabelData1 })
    result1.push({ data: secondValueData1, label: secondLabelData1 })
    result1.push('Global hiring graph')
    result1.push(chartLabel1)


    let result2 = []

    if (user === "employee") {
      data2 = require(path.join(__dirname, '..', '..', 'public', 'data/fortune-companies.json'))
      const firstLabelData2 = 'Google'
      const secondLabelData2 = 'Microsoft'
      const thirdLabelData2 = 'Apple'
      const fourthLabelData2 = 'Flipkart'
      const firstValueData2 = data2.map(ele => ele[firstLabelData2]);
      const secondValueData2 = data2.map(ele => ele[secondLabelData2]);
      const thirdValueData2 = data2.map(ele => ele[thirdLabelData2]);
      const fourthValueData2 = data2.map(ele => ele[fourthLabelData2]);
      const chartLabel2 = data2.map(ele => ele.Week);
      result2.push({ data: firstValueData2, label: firstLabelData2 })
      result2.push({ data: secondValueData2, label: secondLabelData2 })
      result2.push({ data: thirdValueData2, label: thirdLabelData2 })
      result2.push({ data: fourthValueData2, label: fourthLabelData2 })
      result2.push('Intake of fortune four companies')
      result2.push(chartLabel2)
    } else {
      const data2 = require(path.join(__dirname, '..', '..', 'public', 'data/hiring-mode.json'))
      const firstLabelData2 = 'Online'
      const secondLabelData2 = 'Direct'
      const firstValueData2 = data2.map(ele => ele[firstLabelData2]);
      const secondValueData2 = data2.map(ele => ele[secondLabelData2]);
      const chartLabel2 = data2.map(ele => ele.Week);
      result2.push({ data: firstValueData2, label: firstLabelData2 })
      result2.push({ data: secondValueData2, label: secondLabelData2 })
      result2.push('Recent hiring trends')
      result2.push(chartLabel2)
    }






    res.status(200).send({
      result1, result2
    })





    // console.log(data1);
    // var result = await unirest("GET", "https://newscatcher.p.rapidapi.com/v1/search_free").query({
    //   "sort_by": "rank",
    //   "page_size": "100",
    //   "media": "True",
    //   "lang": "en",
    //   "q": "jobs"

    // }).headers({
    //   "x-rapidapi-host": "newscatcher.p.rapidapi.com",
    //   "x-rapidapi-key": "be13d2339emsh990703595a99346p1cf446jsn862e9402a187",
    //   "useQueryString": true
    // });

    // if (result.error) {
    //   console.log(result);
    //   throw new Error()
    // }

    // res.send({
    //   feed: result.body.articles
    // })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: 'Unable to fetch news feed'
    })
  }

}
