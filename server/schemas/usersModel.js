const mongoose = require('../db.js');

const usersSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bikeList: [
    {
      bikeBrand: {
        type: String,
        required: true,
      },
      bikeModel: {
        type: String,
        required: true,
      },
    },
  ],
  groupList: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('User', usersSchema);


