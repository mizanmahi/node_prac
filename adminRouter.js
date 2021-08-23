const express = require('express');

const adminRouter = express.Router();

const loggerMiddleware = (req, res, next) => {
  const { method, originalUrl, baseUrl, protocol, hostname } = req;
  console.log({ method, originalUrl, baseUrl, protocol, hostname });
  next();
};

adminRouter.param('userId', (req, res, next, id) => {
    if(id === '19320002'){
        res.user = 'mizanur rahman'
    }else{
        res.user = 'Unknown Person'
    }

    next();
})

adminRouter.use(loggerMiddleware);

adminRouter
  .route('/panel/:userId')
  .get((req, res) => {
    res.send(res.user);
  })
  .post((req, res) => {
    res.send('Panel Post');
  });

module.exports = adminRouter;
