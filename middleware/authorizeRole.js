// middlewares/authorizeRole.js
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: No user information found' });
      }
  
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden: Unauthorized role' });
      }
  
      next(); // User has the correct role, proceed to the next middleware or route handler
    };
  };
  
  module.exports = authorizeRole;
  