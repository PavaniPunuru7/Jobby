const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// GET the latest profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ _id: -1 }); // 👈 Fetch latest profile

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
