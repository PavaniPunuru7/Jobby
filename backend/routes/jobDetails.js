const express = require("express");
const router = express.Router();
const JobDetail = require("../models/JobDetail");

// GET job details by job ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const jobDetail = await JobDetail.findOne({ id });

    if (!jobDetail) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(jobDetail);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job details" });
  }
});

module.exports = router;
