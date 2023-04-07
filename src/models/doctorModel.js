const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  specialization: {
    type: String,
    required: true
  },
  availableTimes: [{
    day: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    interval: {
      type: Number,
      required: true
    }
  }],
  unavailableDates: [{
    type: Date
  }]
});

module.exports = mongoose.model('Doctor', doctorSchema);