const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.API_KEY)

exports.registrationMail = (to, profileName, secretCode) => {
  return sendgrid.send({
    to,
    from: 'nishanth.mailer@gmail.com',
    subject: 'Registration Link from Mentor-Hub',
    html: `Here is your link http://localhost:4200/profile/${profileName}?key=${secretCode}`
  })
}
