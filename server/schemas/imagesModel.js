const mongoose = require('../db.js')

const usersSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  groupID: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Image', usersSchema);
