const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

const app = express();
dotenv.config();
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
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// error handler middleware funtion
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    next(err.message);
  } else {
    res.status(500).json({ error: err });
  }
};

app.use(errorHandler);

app.listen(3000, () => console.log(`Server is running on 3000`));
