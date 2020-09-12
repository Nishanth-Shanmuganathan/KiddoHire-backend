const sendgrid = require('@sendgrid/mail')
const Job = require('./../models/job.model')
const User = require('./../models/user.model')

sendgrid.setApiKey(process.env.API_KEY)
const from = 'nishanth.mailer@gmail.com'

exports.comparisonReport = (to, username, jobName, postedBy, profileMatch, jobMatch, profileExp, experience, profileCanJoin, canJoin) => {
  return sendgrid.send({
    to,
    from,
    subject: 'Profile comparison report form KiddoHire',
    html: `
    <h5>Hi ${username},</h5><br/>
        You have requested for profile comparison report for the post of <b>${jobName}</b> at <b>${postedBy}</b>. <br/>Though we can't reveal the entire personal information about each applied candidates, we will share you the overall data that the employer might consider.<br/><br/>

    Your Profile match : ${profileMatch}%<br/>
    Candidates with match of 0% - 20% : ${jobMatch['0-20'] || 0}<br/>
    Candidates with match of 20% - 40% : ${jobMatch['20-40'] || 0}<br/>
    Candidates with match of 40% - 60% : ${jobMatch['40-60'] || 0}<br/>
    Candidates with match of 60% - 80% : ${jobMatch['60-80'] || 0}<br/>
    Candidates with match of 80% - 100% : ${jobMatch['80-100'] || 0}<br/><br/>

    Your Experience : ${profileExp} years<br/>
    Candidates with experience of 0-5 years : ${experience['0-5'] || 0}<br/>
    Candidates with experience of 6-10 years : ${experience['6-10'] || 0}<br/>
    Candidates with experience of 11-15 years : ${experience['11-15'] || 0}<br/>
    Candidates with experience of 16-20 years : ${experience['16-20'] || 0}<br/><br/>

    You can join in ${profileCanJoin} months<br/>
    Candidates who can join immediately : ${canJoin['0'] || 0}<br/>
    Candidates who can join in 1 month : ${canJoin['1'] || 0}<br/>
    Candidates who can join in 2 months : ${canJoin['2'] || 0}<br/>
    Candidates who can join in 3 months : ${canJoin['3'] || 0}<br/>
    Candidates who can join in 4 months : ${canJoin['4'] || 0}<br/>
    Candidates who can join in 5 months : ${canJoin['5'] || 0}<br/>
    Candidates who can join in 6 months : ${canJoin['6'] || 0}<br/>
    Candidates who can join in 7 months : ${canJoin['7'] || 0}<br/>
    Candidates who can join in 8 months : ${canJoin['8'] || 0}<br/>
    Candidates who can join in 9 months : ${canJoin['9'] || 0}<br/>
    Candidates who can join in 10 months : ${canJoin['10'] || 0}<br/>
    Candidates who can join in 11 months : ${canJoin['11'] || 0}<br/>
    Candidates who can join in an year : ${canJoin['12'] || 0}<br/><br/>
    Hope this might help you with yours progress.<br/><br/>
    Thank you,<br/>
    KiddoHire Dev
    `
  })
}

exports.roundResult = (to, cleared, username, designation, postedBy) => {
  let html;
  if (cleared) {
    html = `<h5>Hi ${username},</h5><br/>Congratulations,We are happy to inform you that you have been shortlisted for the next round of the interview position of ${designation} at ${postedBy}.Please prepare well to crack it. <br/><br/>Thank you<br/>KiddoHire Dev`
  } else {
    html = `<h5>Hi ${username},</h5><br/>We encourage your interest in ${designation} position at ${postedBy}.But we are sorry to inform that you do not make through the interview process. <br/><br/>Please don't loose hope. Tons of jobs are waiting for you. Keep trying.<br/><br/>Thank you<br/>KiddoHire Dev`
  }

  return sendgrid.send({
    to,
    from,
    subject: 'Interview result form KiddoHire',
    html
  })
}
exports.finalResult = (to, cleared, username, designation, postedBy) => {
  let html;
  if (cleared) {
    html = `<h5>Hi ${username},</h5><br/>Congratulations,We are happy to inform you that you have been selected for the position of ${designation} at ${postedBy}.Please make sure to accept the offer in the applied job section. Once you accepted the offer, further procedure will be proceeded.<br/><br/>Thank you<br/>KiddoHire Dev`
  } else {
    html = `<h5>Hi ${username},</h5><br/>We encourage your interest in ${designation} position at ${postedBy}.But we are sorry to inform that you do not make through the interview process. <br/><br/>Please don't loose hope. Tons of jobs are waiting for you. Keep trying.<br/><br/>Thank you<br/>KiddoHire Dev`
  }

  return sendgrid.send({
    to,
    from,
    subject: 'Interview result form KiddoHire',
    html
  })
}

exports.weeklyMail = async () => {
  const jobs = await Job.find({}).populate('postedBy').populate('shortlisted')
  jobs.forEach(job => {
    job.shortlisted.forEach(applicant => {
      const html = `<h6>Hi ${applicant.applicant.username || applicant.applicant.profileName}</h6><br/>
      We are here to remember you about lifestyle in <b>${job.postedBy.username}</b>. Most of the developers choose to be part of it because of various reasons. Let us elaborate some of them to you.<br/>

      Why we are the best?<br/>${job.postedBy.description}<br/><br/>
      Why devs love us?<br/>${job.postedBy.careerGrowth}<br/><br/>

      We are sure that ${applicant.username || applicant.profileName} suffice your thirst of technology and skill growth.<br/><br/>
      Thank you,<br/>
      KiddoHire Dev
      `

      const to = applicant.applicant.email
      sendgrid.send({
        to,
        from,
        subject: 'Weekly update form KiddoHire',
        html
      })
    })
  })

}
