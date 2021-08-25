const mongoose = require('mongoose');

// todo schema, for validation
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['active', 'inactive'],
  },
});

module.exports = userSchema;
