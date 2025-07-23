const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await Profile.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new Profile({
      username,
      password,
      profile_details: {
        name: username,
        profile_image_url: "https://via.placeholder.com/150",
        short_bio: "New user",
      },
    });

    await newUser.save();
    res.status(201).json({ token: "mock-jwt-token-" + newUser._id });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
});

module.exports = router;
