const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const authRequired = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: 'No token, denied authorization' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
  });

  next();
};

module.exports = authRequired;
