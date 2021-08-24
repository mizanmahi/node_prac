const mongoose = require('mongoose');

// todo schema, for validation
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// mongoose instance method
todoSchema.methods = {
  findActives: function () {
    return mongoose.model('todo').find({ status: 'active' });
  },
};

todoSchema.statics = {
  findByWord: function (word) {
    return this.find({ title: new RegExp(word, 'i') });
  },
};

/* todoSchema.query = {
  ? this is for creating custom query helpers like save find etc.
  show: function () {
    return this.find()
  }
} */

module.exports = todoSchema;
