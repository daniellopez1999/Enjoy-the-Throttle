const mongoose = require('../db.js')

const messagesSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  groupID: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Message', messagesSchema);
