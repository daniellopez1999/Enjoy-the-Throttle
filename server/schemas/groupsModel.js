const mongoose = require('../db.js');

const groupsSchema = mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  bikeBrand: {
    type: String,
    required: false,
  },
  bikeModel: {
    type: String,
    required: false,
  },
  mandatoryBike: {
    type: Boolean,
    required: false,
  },
  memberList: {
    type: [String],
    required: true,
  }
});

module.exports = mongoose.model('Group', groupsSchema);
