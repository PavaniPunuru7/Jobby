const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company_logo_url: String,
  employment_type: String,
  id: String,
  job_description: String,
  location: String,
  package_per_annum: String,
  rating: Number,
  title: String,
});

module.exports = mongoose.model("Job", jobSchema);
