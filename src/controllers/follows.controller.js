const User = require('./../models/user.model')
const Job = require('./../models/job.model')

exports.fetchConnection = async (req, res) => {
  const user = req.user
  let connections;
  try {
    if (user.role === 'hr') {
      connections = await fetchConnections(user, 'developer')
    } else {
      connections = await fetchConnections(user, 'hr')
    }
    res.status(200).send({ connections })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Unable to fetch connections' })
  }
}
exports.fetchMyConnection = async (req, res) => {
  const user = req.user
  try {
    const connections = await User.find({ _id: { $in: user.follows } })
    res.status(200).send({ connections })
  } catch (error) {
    res.status(400).send({ message: 'Unable to fetch connections' })
  }
}

exports.addConnection = async (req, res) => {
  let user = req.user
  const userName = req.params.userName
  try {
    const connection = await User.findOne({ profileName: userName })
    if (
      ((user.role !== 'hr' && connection.role !== 'developer') ||
        (user.role !== 'developer' && connection.role !== 'hr')) &&
      !connection) {
      return res.status(400).send({ message: 'Invalid request' })
    }
    user = await User.findById(user._id)
    user.follows.push(connection._id)
    await user.save()
    let connections;
    if (user.role === 'hr') {
      connections = await fetchConnections(user, 'developer')
    } else {
      connections = await fetchConnections(user, 'hr')
    }
    res.status(200).send({ message: 'User followed', connections })
  } catch (error) {
    res.status(400).send({ message: 'Unable to follow' })
  }
}

exports.removeConnection = async (req, res) => {
  let user = req.user
  const userName = req.params.userName
  try {
    const connection = await User.findOne({ profileName: userName })
    if (
      ((user.role !== 'hr' && connection.role !== 'developer') ||
        (user.role !== 'developer' && connection.role !== 'hr')) &&
      !connection) {
      return res.status(400).send({ message: 'Invalid request' })
    }
    user = await User.findById(user._id)
    const index = user.follows.indexOf(connection._id)
    user.follows.splice(index, 1)
    await user.save()
    let connections;
    if (user.role === 'hr') {
      connections = await fetchConnections(user, 'developer')
    } else {
      connections = await fetchConnections(user, 'hr')
    }
    res.status(200).send({ message: 'User unfollowed', connections })
  } catch (error) {
    res.status(400).send({ message: 'Unable to unfollow' })
  }
}

fetchConnections = async (user, role) => {
  return await User.find({ $and: [{ role }, { _id: { $nin: user.follows } }] })
}
