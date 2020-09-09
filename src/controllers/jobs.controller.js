const unirest = require("unirest");
const Job = require('./../models/job.model')
const User = require('./../models/user.model')

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
    const job = await Job.findById(jobId)
    if (!job) { throw new Error() }
    const dbUser = await User.findById(user._id)
    let count = 0;
    job.skills.forEach(element => {
      count = dbUser.skills.indexOf(element) + 1 ? count + 1 : count
    });
    dbUser.jobs.push(job._id)
    job.applicants.push({ applicant: user._id, jobMatch: parseInt(count / job.skills.length * 100) })
    await dbUser.save()
    await job.save()
    let jobs = await Job.find({ $and: [{ skills: { $in: user.skills } }, { _id: { $nin: dbUser.jobs } }] }).populate('postedBy')
    if (!jobs.length) {
      jobs = await Job.find({ _id: { $nin: user.jobs } }).populate('postedBy')
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
  console.log('applied');
  const user = req.user
  let jobs;
  try {
    if (user.role === 'hr') {
      jobs = await Job.find({ postedBy: user._id }).populate('postedBy')
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
