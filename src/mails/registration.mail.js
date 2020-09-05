const sendgrid = require('@sendgrid/mail')

exports.registrationMail = (to) => {
  return sendgrid.send({
    to,
    to: email,
    from: 'nishanth.mailer@gmail.com',
    subject: 'Registration Link from Mentor-Hub',
    html: `Here is your link http://localhost:4200/profile`
  })
}
