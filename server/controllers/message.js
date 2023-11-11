const Message = require('./../schemas/messagesModel')

const getAllMessages = async (req, res) => {
  console.log(req.body)
  console.log('he llegado GET')
  res.status(200).json({message: req.body})
}

const postMessage = async (req, res) => {
  console.log(req.body)
  let { userID, groupName, text } = req.body

  console.log('USER ID: ',userID)
  console.log('GROUP ID: ', groupName)
  console.log('TEXT: ', text)
  res.status(200).json({message: req.body})

  try {
    let newMessage = new Message({
      userID: userID,
      groupName: groupName,
      text: text
    })

    console.log(newMessage)

    await newMessage.save();
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllMessages,
  postMessage
}