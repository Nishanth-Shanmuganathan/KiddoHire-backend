const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.API_KEY)

exports.registrationMail = (to, profileName, secretCode) => {
  return sendgrid.send({
    to,
    from: 'nishanth.mailer@gmail.com',
    subject: 'Registration Link from KiddoHire',
    html: `Here is your link ${process.env.URL}profile/${profileName}?key=${secretCode}`
  })
}
