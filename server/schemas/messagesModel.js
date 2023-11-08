const mongoose = require('../db.js')

const messagesSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  groupID: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('User', messagesSchema);
