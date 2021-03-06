const jwt = require("jsonwebtoken");
const { jwtSecret } = require('../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: `token required` });
  } else {
    jwt.verify(token, jwtSecret, (err, decode) => {
      if (err) {
        res
          .status(401)
          .json({
            message: `token invalid`,
          });
      } else {
        req.decodedToken = decode;
        next();
      }
    });
  }
}