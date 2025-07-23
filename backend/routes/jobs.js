const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

const EMPLOYMENT_TYPE_MAP = {
  FULLTIME: "Full Time",
  PARTTIME: "Part Time",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
};

router.get("/", async (req, res) => {
  try {
    const { employment_type, package_per_annum, title } = req.query;
    const query = {};

    if (employment_type) {
      const typesArray = employment_type.split(",");
      const readableTypes = typesArray.map((type) => EMPLOYMENT_TYPE_MAP[type]);
      query.employment_type = { $in: readableTypes };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    console.log("🔍 MongoDB Query:", query);

    let jobs = await Job.find(query);

    if (package_per_annum) {
      const minLPA = parseInt(package_per_annum, 10) / 100000;
      jobs = jobs.filter((job) => {
        const salaryStr = job.package_per_annum;
        const lpaMatch = salaryStr?.split(" ")[0];
        const jobLPA = parseInt(lpaMatch, 10);
        return jobLPA >= minLPA;
      });
    }

    res.json({ jobs, total: jobs.length });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
