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


const dotenv = require('dotenv');
dotenv.config();

const authenticateAdmin = (req, res, next) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(401).send('Unauthorized'); // Send an unauthorized response
  }
};

module.exports = authenticateAdmin;



