const express = require('express');
const mongoose = require('mongoose');

const todoHandler = require('./routeHandler/todoHandler');

const app = express();
app.use(express.json());

// connecting with the mondo via mongoose
mongoose
  .connect('mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection established successfully!'))
  .catch((err) => console.log(err.message));

// application routes
app.use('/todo', todoHandler)

// error handler middleware funtion
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    next(err.message);
  } else {
    res.status(500).json({ error: err });
  }
};

app.listen(3000, () => console.log(`Server is running on 3000`));
