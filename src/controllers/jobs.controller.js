const unirest = require("unirest");
const Job = require('./../models/job.model')
const User = require('./../models/user.model')
const { comparisonReport, roundResult, finalResult } = require('./../mails/job.mail');
const { Mongoose } = require("mongoose");
exports.searchCity = async (req, res) => {
  const string = req.params.city
  try {
    const result = await unirest("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/cities").query({
      "namePrefix": string
    }).headers({
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      "x-rapidapi-key": "be13d2339emsh990703595a99346p1cf446jsn862e9402a187",
      "useQueryString": true
    });

    if (result.error) throw new Error(result.error);
    const data = result.body.data.map(element => element['city']);
    res.status(200).send({ data })
  } catch (error) {
    res.status(400).send({ message: 'No cities found' })
  }
}

exports.addJob = async (req, res) => {
  const user = req.user
  if (user.role !== 'hr') {
    return res.status(400).send({ message: 'Restricted user permissions' })
  }
  try {
    const skills = req.body.skills.map(skill => skill.toLowerCase().trim())
    const job = new Job({
      designation: req.body.designation.trim(),
      description: req.body.description.trim(),
      skills,
      minimumExperience: req.body.minimumExperience,
      maximumExperience: req.body.maximumExperience,
      minimumSalary: req.body.minimumSalary,
      maximumSalary: req.body.maximumSalary,
      location: req.body.location.trim(),
      totalRounds: req.body.totalRounds,
      rounds: req.body.rounds,
    })
    job.postedBy = user._id
    for (let i = 0; i < job.totalRounds + 1; i++) {
      job.applicants.push({
        round: i,
        applicants: []
      })
    }
    await job.save()
    const dbUser = await User.findById(user._id)
    dbUser.jobs.push(job._id)
    await dbUser.save()
    res.status(200).send({ message: 'New job posted', user: dbUser })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to add job' })
  }
}
exports.editingJob = async (req, res) => {
  const user = req.user
  console.log('gii');
  const jobId = req.params.jobId
  try {

    let job = await Job.findById(jobId)
    if (user.role !== 'hr' || job.postedBy.toString() !== user._id.toString()) {
      console.log(job.postedBy.toString(), user._id.toString());
      return res.status(400).send({ message: 'Restricted user permissions' })
    }
    job.skills = req.body.skills.map(skill => skill.toLowerCase().trim())
    job.designation = req.body.designation.trim()
    job.description = req.body.description.trim()
    job.minimumExperience = req.body.minimumExperience
    job.maximumExperience = req.body.maximumExperience
    job.minimumSalary = req.body.minimumSalary
    job.maximumSalary = req.body.maximumSalary
    job.location = req.body.location.trim()
    job.totalRounds = req.body.totalRounds
    job.rounds = req.body.rounds

    await job.save()
    const dbUser = await User.findById(user._id)
    res.status(200).send({ message: 'Job edited', user: dbUser })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to edit job' })
  }
}
exports.applyJob = async (req, res, next) => {
  const user = req.user
  const jobId = req.params.jobId
  if (user.role === 'hr') {
    return res.status(400).send({ message: 'Restricted user permissions' })
  }

  try {
    const job = await Job.findById(jobId).populate('postedBy')
    if (!job) { throw new Error() }
    const dbUser = await User.findById(user._id)
    const jobMatch = matchCalculator(job.skills, dbUser.skills)
    dbUser.applications.push({ job: job._id, status: { cleared: jobMatch !== 0, round: 0 } })
    job.applicants[0].applicants.push({ applicant: user._id, jobMatch })
    // console.log({ applicant: user._id, jobMatch, status: { cleared: jobMatch > 20, stage: 'Preliminary Test' } });
    if (jobMatch) {
      // dbUser.applications.push({ job: job._id, status: { round: 1 } })
      job.applicants[1].applicants.push({ applicant: user._id, jobMatch })

    }

    await dbUser.save()
    await job.save()
    // await roundResult(user.email, jobMatch !== 0, user.username || user.profileName, job.designation, job.postedBy.username)
    // console.log('mail sent');

    let jobs = await Job.find({ $and: [{ skills: { $in: user.skills } }, { 'applicants.applicants.applicant': { $nin: dbUser._id } }] }).populate('postedBy')
    // if (!jobs.length) {
    //   jobs = await Job.find({ _id: { $nin: dbUser.jobs } }).populate('postedBy')
    // }
    res.status(200).send({ message: 'Job applied', jobs })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to apply' })
  }
}

exports.fetchAppliedJobs = async (req, res) => {
  const user = req.user
  try {
    let jobs = await Job.find({ 'applicants.applicants.applicant': { $in: user._id } }).populate('postedBy')
    res.status(200).send({ jobs })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to fetch jobs' })
  }
}

exports.fetchJobs = async (req, res) => {
  const user = req.user
  let jobs;
  try {
    if (user.role === 'hr') {
      jobs = await Job.find({ postedBy: user._id }).populate('postedBy').populate('applicants.applicants.applicant')
    } else {
      jobs = await Job.find({ $and: [{ skills: { $in: user.skills } }, { 'applicants.applicants.applicant': { $nin: user._id } }] }).populate('postedBy')
      if (!jobs.length) {
        jobs = await Job.find({ 'applicants.applicants.applicant': { $nin: user._id } }).populate('postedBy')
      }
    }
    res.status(200).send({ jobs })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to fetch jobs' })
  }
}

exports.generateReport = async (req, res) => {
  const user = req.user
  const jobId = req.params.jobId
  try {
    const job = await Job.findById(jobId).populate('postedBy').populate('applicants.applicant')
    let exp = {}
    let jobMatch = {}
    let canJoin = {}
    job.applicants.forEach(ele => {
      //Calculating experience
      if (ele.applicant.experience > 15) {
        exp['16-20'] = exp['16-20'] ? exp['16-20'] + 1 : 1
      } else if (ele.applicant.experience > 10) {
        exp['11-15'] = exp['11-15'] ? exp['11-15'] + 1 : 1
      } else if (ele.applicant.experience > 5) {
        exp['6-10'] = exp['6-10'] ? exp['6-10'] + 1 : 1
      } else if (ele.applicant.experience >= 0) {
        exp['0-5'] = exp['0-5'] ? exp['0-5'] + 1 : 1
      }

      //Calculating jobMatch
      if (ele.jobMatch > 80) {
        jobMatch['80-100'] = jobMatch['80-100'] ? jobMatch['80-100'] + 1 : 1
      } else if (ele.jobMatch > 60) {
        jobMatch['60-80'] = jobMatch['60-80'] ? jobMatch['60-80'] + 1 : 1
      } else if (ele.jobMatch > 40) {
        jobMatch['40-60'] = jobMatch['40-60'] ? jobMatch['40-60'] + 1 : 1
      } else if (ele.jobMatch > 20) {
        jobMatch['20-40'] = jobMatch['20-40'] ? jobMatch['20-40'] + 1 : 1
      } else if (ele.jobMatch >= 0) {
        jobMatch['0-20'] = jobMatch['0-20'] ? jobMatch['0-20'] + 1 : 1
      }

      //can join

      if (ele.applicant.canJoin > 11) {
        canJoin["12"] = canJoin["12"] ? canJoin["12"] + 1 : 1
      } else {
        canJoin[ele.applicant.canJoin] = canJoin[ele.applicant.canJoin] ? canJoin[ele.applicant.canJoin] + 1 : 1
      }
    })
    await comparisonReport(user.email, user.username || user.profileName, job.designation, job.postedBy.username, matchCalculator(job.skills, user.skills), jobMatch, user.experience, exp, user.canJoin, canJoin)

    res.status(200).send({ message: 'Report sent to your mail-id. Kindly check your inbox for the profile comparison report...' })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to send profile comparison report... Please try again.' })
  }
}

matchCalculator = (arr, arr2) => {
  let count = 0;
  arr2 = arr2.map(ele => ele.toLowerCase())
  arr.forEach(element => {
    count = arr2.indexOf(element.toLowerCase()) + 1 ? count + 1 : count
  });
  return parseInt(count / arr.length * 100)
}

exports.rejectApplicant = async (req, res) => {
  const user = req.user
  let jobId = req.params.jobId
  let applicantName = req.params.userId
  let round = req.params.round
  try {
    if (user.role !== 'hr') {
      return res.status(401).send({ message: 'Restricted user access' })
    }
    const job = await Job.findById(jobId)
    const dbCandidate = await User.findOne({ profileName: applicantName })
    dbCandidate.applications.forEach((app, index) => {
      if (app.job.toString() === job._id.toString()) {
        dbCandidate.applications[index].status.push({ cleared: false, round })
      }
    })
    const candidateDetailsIndex = job.applicants[round].applicants.find(app => app.applicant.toString() === dbCandidate._id.toString())
    job.applicants[round].applicants.splice(candidateDetailsIndex, 1)
    await job.save()
    await dbCandidate.save()
    await roundResult(applicant.email, false, applicant.username || applicant.profileName, job.designation, job.postedBy.username)
    res.status(200).send({ message: 'Applicant rejected' })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to reject applicant' })
  }
}

exports.shortlistApplicant = async (req, res) => {
  const user = req.user
  let jobId = req.params.jobId
  let applicantName = req.params.userId
  let round = req.params.round
  try {
    if (user.role !== 'hr') {
      return res.status(401).send({ message: 'Restricted user access' })
    }
    const job = await Job.findById(jobId).populate('postedBy')
    const dbCandidate = await User.findOne({ profileName: applicantName })
    dbCandidate.applications.forEach((app, index) => {
      if (app.job.toString() === job._id.toString()) {
        dbCandidate.applications[index].status.push({ cleared: true, round })
      }
    })
    if (parseInt(round) + 1 >= job.totalRounds) {
      job.shortlisted.push({ applicant: dbCandidate._id, accepted: false })
      finalResult(dbCandidate.email, true, dbCandidate.username || dbCandidate.profileName, job.designation, job.postedBy.username)
    } else {
      const candidateDetailsIndex = job.applicants[round].applicants.find(app => app.applicant.toString() === dbCandidate._id.toString())
      const candidateDetails = job.applicants[round].applicants.slice(candidateDetailsIndex, 1)
      job.applicants[parseInt(round) + 1].applicants.push(...candidateDetails)
      roundResult(dbCandidate.email, true, dbCandidate.username || dbCandidate.profileName, job.designation, job.postedBy.username)
    }
    job.applicants[round].applicants.splice(candidateDetailsIndex, 1)
    await job.save()
    await dbCandidate.save()
    res.status(200).send({ message: 'Applicant shortlisted' })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to shortlist applicant' })
  }
}
