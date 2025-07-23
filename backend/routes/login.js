const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log("🔐 Login attempt:", username);

  try {
    const user = await Profile.findOne({ username });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ error: "Invalid username or password" });
    }

    if (user.password !== password) {
      console.log("❌ Incorrect password");
      return res.status(401).json({ error: "Invalid username or password" });
    }

    console.log("✅ Login successful");
    res.status(200).json({ token: "mock-jwt-token-" + user._id });
  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
