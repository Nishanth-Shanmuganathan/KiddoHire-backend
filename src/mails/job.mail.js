const sendgrid = require('@sendgrid/mail')

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

exports.roundResult = (to, cleared, username, designation, postedBy, round) => {
  let html;
  if (cleared) {
    html = `<h5>Hi ${username},</h5><br/>We are happy to inform you that you have made through the ${round} round for the interview process of ${designation} position at ${postedBy}.Soon you will be receiving the interview dates and tips. Stay tuned.<br/><br/>Thank you<br/>KiddoHire Dev`
  } else {
    html = `<h5>Hi ${username},</h5><br/>We encourage your interest in ${designation} position at ${postedBy}.But we are sorry to inform that you do not make through the ${round} round. <br/><br/>Please don't loose hope. Tons of jobs are waiting for you. Keep trying.<br/><br/>Thank you<br/>KiddoHire Dev`
  }
  return sendgrid.send({
    to,
    from,
    subject: 'Profile comparison report form KiddoHire',
    html
  })
}
