const Message = require('./../schemas/messagesModel');
const User = require('./../schemas/usersModel');

const getAllMessages = async (req, res) => {
  const groupName = decodeURIComponent(req.params.groupName);

  try {
    const messages = await Message.find({ groupName: groupName });

    // gert userIDS from messages
    const UserIDS = Array.from(
      new Set(messages.map((message) => message.userID))
    );
    // get users with previous UserIDS
    const users = await User.find({ _id: { $in: UserIDS } });

    // MAP users by userID
    const userMap = new Map(users.map((user) => [user._id.toString(), user]));

    // Add userName to MEssages
    const messagesWithNames = messages.map((message) => ({
      ...message.toObject(),
      userName: userMap.get(message.userID.toString()).name,
    }));

    res.status(200).json({ message: messagesWithNames });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postMessage = async (req, res) => {
  let { userID, groupName, text } = req.body;

  try {
    let newMessage = new Message({
      userID: userID,
      groupName: groupName,
      text: text,
    });

    const postNewMessage = await newMessage.save();

    //After posting Message, as timestamp is created in DB, gets the message with the ID and res timestamp
    const getCreatedAt = async (nwMessage) => {
      const timestamp = await Message.findById(nwMessage._id);
      res.json({ createdAt: timestamp });
    };

    getCreatedAt(postNewMessage);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllMessages,
  postMessage,
};
