import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get token from cookie or headers
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

    req.userId = decoded.userId; // Attach user ID to request object
    req.role = decoded.role;     // Attach user role to request object

    next(); // Proceed to the next middleware
  } catch (error) {
    console.log("Error in verifyToken: ", error);
    return res.status(403).json({ success: false, message: "Forbidden - invalid token" });
  }
};
