const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const secretKey = secret; // Secret key for signing and verifying tokens

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ errorMessage: "Access denied", status: false });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.userId; // Store the user ID in the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ errorMessage: "Invalid token", status: false });
  }
};

module.exports = authMiddleware;