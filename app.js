const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
var cron = require('node-cron');

const authRouter = require('./src/routes/auth.route')
const homeRouter = require('./src/routes/home.route')
const jobsRouter = require('./src/routes/jobs.route')
const profileRouter = require('./src/routes/profile.route')
const followsRouter = require('./src/routes/follows.route')
const publicRouter = require('./src/routes/public.route')

const { authentication } = require('./src/controllers/auth.controller')
const { weeklyMail } = require('./src/mails/job.mail')

const app = express()
const User = require('./src/models/user.model')

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


app.use('/auth', authRouter)
app.use('/public', publicRouter)
app.use('/node-home', authentication, homeRouter)
app.use('/node-jobs', authentication, jobsRouter)
app.use('/node-profile', authentication, profileRouter)
app.use('/node-follows', authentication, followsRouter)

app.use('/', express.static(path.join(__dirname, 'KiddoHire')))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'KiddoHire', 'index.html'))
})

//Wee
cron.schedule('* * * * Sunday', () => {
  weeklyMail()
});

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
