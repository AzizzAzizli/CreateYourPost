const jsonwebtoken = require("jsonwebtoken");


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ message: "Token is missing", status: 401 });
  
    jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token", status: 403 });
  
      req.user = user; 
      next(); 
    });
  }
  
  module.exports = { authenticateToken };