const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.SECRET;
const secretKey = secret; // Secret key for signing and verifying tokens

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ errorMessage: "Access denied", status: false });
    console.log(token);
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("here1");
    console.log(decoded);
    req.user = decoded.userId; // Store the user ID in the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    console.log(secret);
    console.log(secretKey);
    console.log(token)
    res.status(400).json({ errorMessage: "Invalid token", status: false });
  }
};

module.exports = authMiddleware;