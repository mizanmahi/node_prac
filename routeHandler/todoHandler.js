const express = require('express');
const mongoose = require('mongoose');

const todoSchema = require('../schemas/todoSchema');

// crating a Todo model (class) by calling mongoose.model class
const Todo = new mongoose.model('todo', todoSchema);

const router = express.Router();

// getting all todo
router.get('/', (req, res) => {
  Todo.find({}, (err, arr) => {
    if (!err) {
      res.status(200).json({ message: arr });
    }
  });
});

// ? Getting active todos route by using our custom instance method
router.get('/actives', async (req, res) => {
  const newTodo = new Todo();
  try {
    const data = await newTodo.findActives();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// ? Getting todos route by using our custom static method
router.get('/foods', async (req, res) => {
  try {
    const data = await Todo.findByWord('food');
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:id', (req, res) => {
  Todo.find({ _id: req.params.id }, (err, arr) => {
    if (!err) {
      res.status(200).json({ todo: arr });
    } else {
      res.status(500).json({ error: 'There is something wrong!' });
    }
  });
});

// saving single todo
router.post('/', (req, res) => {
  const newTodo = new Todo(req.body);
  // saving is asynchronus
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Todo is saved successfylly!' });
    }
  });
});

// saving multiple todos
router.post('/all', (req, res) => {
  // saving multiple data
  Todo.insertMany(req.body, (err) =>
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

router.delete('/:id', (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.status(200).json({ message: 'deleted successfully!' });
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

module.exports = router;
