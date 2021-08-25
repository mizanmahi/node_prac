const jwt = require('jsonwebtoken');

const authGuard = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    // checking if token mathes our secret sign
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userName } = decodedToken;
    req.userName = userName;
    next();
  } catch (err) {
    next('Authentication falied!');
  }
};

module.exports = authGuard;
