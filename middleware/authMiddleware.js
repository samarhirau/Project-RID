// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next(); // Allow the request to proceed
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = authenticateJWT;



// const dotenv = require('dotenv');
// dotenv.config();

// const authenticateAdmin = (req, res, next) => {
//   const { email, password } = req.body;

//   if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//     next(); // Proceed to the next middleware or route handler
//   } else {
//     res.status(401).send('Unauthorized'); // Send an unauthorized response
//   }
// };

// module.exports = authenticateAdmin;



