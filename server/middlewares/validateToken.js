const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

const authRequired = async (req,res,next) => {
  const {token} = req.cookies; //el objeto cookies tiene la key token con el value de token, así que para hacer deconstruct se hace {token} para encontrarlo dentro de req.cookies
  if (!token) return res.status(401).json({message: "No token, denied authorization"})
  
  jwt.verify(token, SECRET_KEY, (err,user) => {
    if (err) return res.status(403).json({message: "Invalid token"})
    req.user = user;
    

  })
  
  next();
}


module.exports = authRequired;