const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// Register
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ msg: "User already exists" });

        const hashedPwd = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPwd, role });

        await user.save();
        res.status(201).json({ msg: "User registered" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Login
// Login
const loginUser = async (req, res) => {
  console.log("Request body:", req.body); // Debug log
  
  // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({ msg: "Request body is missing" });
  }
  
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });
    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Admin: Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { registerUser, loginUser, getAllUsers };
