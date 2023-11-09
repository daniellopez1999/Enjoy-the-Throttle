const mongoose = require('../db.js');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  groupList: {
    type: [String],
    required: false,
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
});

module.exports = mongoose.model('User', usersSchema);


