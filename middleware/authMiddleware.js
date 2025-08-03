const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("Headers:", req.headers); // Debug log
  
  let token = req?.headers?.authorization?.split(" ")[1];
  console.log("Extracted token:", token); // Debug log
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug log
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token verification error:", error); // Debug log
    res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  console.log("User from token:", req.user); // Debug log
  console.log("User role:", req.user?.role); // Debug log
  
  if (req.user?.role !== "admin") {
    return res.status(403).json({ msg: "Admin access only" });
  }
  next();
};

module.exports = { protect, isAdmin };