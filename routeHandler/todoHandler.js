const express = require('express');
const mongoose = require('mongoose');

const todoSchema = require('../schemas/todoSchema');

// crating a Todo class by calling mongoose.model class
const Todo = new mongoose.model('todo', todoSchema);

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('TODO GET');
});

router.get('/:id', async (req, res) => {});

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
  Todo.updateOne(
    { _id: req.params.id },
    { $set: {description: req.body.value} },
    (err) =>
      err
        ? res.status(500).json({ error: err.message })
        : res.status(200).json({ message: `field is updated successfully!` })
  );
});

router.delete('/:id', async (req, res) => {});

module.exports = router;
