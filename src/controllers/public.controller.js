const User = require('./../models/user.model')


exports.imageFetch = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    if (!user) { throw new Error() }
    res.set('Content-type', 'image/jpg')
    res.send(user.image)
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Unable to fetch' })
  }
}

exports.resumeFetch = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    if (!user) { throw new Error() }
    res.set('Content-type', 'application/pdf')
    res.send(user.resumeBuffer)
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Unable to fetch' })
  }
}
exports.certificateFetch = async (req, res) => {
  const id = req.params.id
  const certificateId = req.params.certificateId
  try {
    const user = await User.findById(id)
    if (!user) { throw new Error() }
    res.set('Content-type', 'image/jpg')
    res.send(user.certificateBuffer[certificateId])
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: 'Unable to fetch' })
  }
}
