const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = require('../schemas/userSchema');

// crating a Todo model (class) by calling mongoose.model class
const User = new mongoose.model('User', userSchema);

const router = express.Router();

// getting all todo
router.post('/signup', async (req, res) => {
  const { userName, password, name, status } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    userName,
    password: hashedPassword,
    status,
  });
  // saving is asynchronus
  newUser.save((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Signup successful!' });
    }
  });
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.find({ userName: req.body.userName });
    if (user && user.length > 0) {
      // validating password
      const isValidPass = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPass) {
        // generating token
        const token = jwt.sign(
          { userName: user[0].userName },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );

        res
          .status(200)
          .send({ accessToken: token, message: 'Login successfull' });
      } else {
        res.status(401).send({ error: 'Authentication faild' });
      }
    } else {
      res.status(401).send({ error: 'Authentication faild' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Authentication faild' });
  }
});

// testing route
router.get('/head', (req, res, next) => {
  // console.log(req.headers);
  req.header()
  res.send({headers: req.headers})
})


module.exports = router;
