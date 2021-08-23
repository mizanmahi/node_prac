const express = require('express');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', './views') // optional and used for change the view folder

// @ this is a middle where which just logs the request information
// ? application level middleware
/* const logger = (req, res, next) => {
  const { method, protocol, ip, originalUrl, hostname } = req;
  const time = new Date(Date.now()).toLocaleString();
  console.log({ method, originalUrl, protocol, hostname, ip, time});
  next();
};

app.use(logger);

app.get('/home', (req, res) => {
  res.json({ name: 'Mizan' });
});

app.listen(3000, () => console.log('Server is running on port 3000')); */


// @ this is a middle where which just logs the request information
// ? router level middleware

/* const adminRouter = express.Router();

 const logger = (req, res, next) => {
  const { method, protocol, ip, originalUrl, hostname } = req;
  const time = new Date(Date.now()).toLocaleString();
  console.log({ method, originalUrl, protocol, hostname, ip, time});
  next();
};

// @ every request of admin router will go through this middleware
adminRouter.use(logger);

adminRouter.get('/panel', (req, res, next) => {
  res.send({name: 'AdminPanel'});
})

app.use('/admin', adminRouter);

// app.use(logger);

app.get('/home', (req, res) => {
  res.json({ name: 'Home' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));  */

const adminRouter = require('./adminRouter');

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.use('/admin', adminRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));