const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./route/userRoutes.js");
const connectDB = require("./config/db.js");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("API is running!");
});

// All API routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
