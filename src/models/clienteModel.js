const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
  phoneNumber: {
    type: String,
  }
});

module.exports = mongoose.model('Client', clientSchema);
