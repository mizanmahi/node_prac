const express = require('express');
const mongoose = require('mongoose');

const todoSchema = require('../schemas/todoSchema');

// crating a Todo model (class) by calling mongoose.model class
const Todo = new mongoose.model('todo', todoSchema);

const router = express.Router();

// getting all todo
router.get('/', async (req, res) => {
  await Todo.find({}, (err, arr) => {
    if (!err) {
      res.status(200).json({ message: arr });
    }
  });
});

router.get('/:id', async (req, res) => {
  await Todo.find({ _id: req.params.id }, (err, arr) => {
    if (!err) {
      res.status(200).json({ todo: arr });
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

// saving single todo
router.post('/', async (req, res) => {
  const newTodo = new Todo(req.body);
  // saving is asynchronus
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Todo is saved successfylly!' });
    }
  });
});

// saving multiple todos
router.post('/all', async (req, res) => {
  // saving multiple data
  await Todo.insertMany(req.body, (err) =>
    err
      ? res.status(500).json({ error: err.message })
      : res.status(200).json({ message: 'Todos were saved successfully!' })
  );
});

router.put('/:id', async (req, res) => {
  const result = await Todo.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { description: req.body.value } },
    {
      useFindAndModify: false,
    },
    (err) =>
      err
        ? res.status(500).json({ error: err.message })
        : res.status(200).json({ message: `field is updated successfully!` })
  );
  // console.log(result);
});

router.delete('/:id', async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.status(200).json({ message: 'deleted successfully!' });
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

module.exports = router;
