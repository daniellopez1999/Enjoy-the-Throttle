const mongoose = require('../db.js');

const groupsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  bikeBrand: {
    type: String,
    required: true,
  },
  bikeModel: {
    type: String,
    required: true,
  },
  mandatoryBike: {
    type: Boolean,
    required: false,
  }
});

module.exports = mongoose.model('Group', groupsSchema);
