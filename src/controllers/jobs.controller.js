const unirest = require("unirest");
const Job = require('./../models/job.model')
const User = require('./../models/user.model')
const { comparisonReport, roundResult } = require('./../mails/job.mail')
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
    const job = new Job(req.body)
    job.postedBy = user._id
    await job.save()
    const dbUser = await User.findById(user._id)
    dbUser.jobs.push(job._id)
    await dbUser.save()
    res.status(200).send({ message: 'New job posted' })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to add job' })
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
    if (jobMatch) {
      dbUser.jobs.push(job._id)
      job.applicants.push({ applicant: user._id, jobMatch, status: { cleared: jobMatch > 20, stage: 'Preliminary Test' } })
      // console.log({ applicant: user._id, jobMatch, status: { cleared: jobMatch > 20, stage: 'Preliminary Test' } });
      console.log(job.applicants[job.applicants.length - 1]);
      await dbUser.save()
      await job.save()
    }
    await roundResult(user.email, jobMatch !== 0, user.username || user.profileName, job.designation, job.postedBy.username, 'Preliminary')
    console.log('mail sent');
    let jobs = await Job.find({ $and: [{ skills: { $in: user.skills } }, { _id: { $nin: dbUser.jobs } }] }).populate('postedBy')
    if (!jobs.length) {
      jobs = await Job.find({ _id: { $nin: dbUser.jobs } }).populate('postedBy')
    }
    res.status(200).send({ message: 'Job applied', jobs })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to apply' })
  }
}

exports.fetchAppliedJobs = async (req, res) => {
  const user = req.user
  let jobs;
  try {
    jobs = await Job.find({ _id: { $in: user.jobs } }).populate('postedBy')
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
      jobs = await Job.find({ postedBy: user._id }).populate('postedBy').populate('applicants.applicant')
    } else {
      jobs = await Job.find({ $and: [{ skills: { $in: user.skills } }, { _id: { $nin: user.jobs } }] }).populate('postedBy')
      if (!jobs.length) {
        jobs = await Job.find({ _id: { $nin: user.jobs } }).populate('postedBy')
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
  arr.forEach(element => {
    count = arr2.indexOf(element) + 1 ? count + 1 : count
  });
  return parseInt(count / arr.length * 100)
}

exports.rejectApplicant = async (req, res) => {
  const user = req.user
  let jobId = req.params.jobId
  let applicantId = req.params.userId
  try {
    if (user.role !== 'hr') {
      return res.status(401).send({ message: 'Restricted user access' })
    }
    job = await Job.findById(jobId)
    if (!job) {
      throw new Error()
    }
    const index = job.applicants.findIndex(applicant => applicant.applicant === applicantId)
    job.applicants.splice(index, 1)
    await job.save()
    res.status(200).send({ message: 'Applicant rejected' })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to reject applicant' })
  }
}
