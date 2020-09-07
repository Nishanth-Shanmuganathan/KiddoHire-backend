const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRouter = require('./src/routes/auth.route')
const homeRouter = require('./src/routes/home.route')
const jobsRouter = require('./src/routes/jobs.route')
const profileRouter = require('./src/routes/profile.route')

const { authentication } = require('./src/controllers/auth.controller')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use('/public', express.static('public'))
app.use('/resume', express.static('resume'))
app.use('/image', express.static('image'))
app.use('/certificate', express.static('certificate'))
app.use('/auth', authRouter)

app.use('/node-home', authentication, homeRouter)
app.use('/node-jobs', authentication, jobsRouter)
app.use('/node-profile', authentication, profileRouter)

// app.use('/', express.static(path.join(__dirname, 'KiddoHire')))

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'KiddoHire', 'index.html'))
// })
const port = process.env.PORT || 3000
mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(async res => {
  await app.listen(port)
  console.log('Connected on port : ' + port);
})
  .catch(err => {
    console.log(err);
  })
