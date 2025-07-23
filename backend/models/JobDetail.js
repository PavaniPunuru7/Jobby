const mongoose = require("mongoose");

const jobDetailSchema = new mongoose.Schema({
  companyLogoUrl: String,
  companyWebsiteUrl: String,
  employmentType: String,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  jobDescription: String,
  skills: [
    {
      imageUrl: String,
      name: String,
    },
  ],
  lifeAtCompany: {
    description: String,
    imageUrl: String,
  },
  location: String,
  packagePerAnnum: String,
  rating: Number,
  similarJobs: [
    {
      companyLogoUrl: String,
      employmentType: String,
      id: String,
      jobDescription: String,
      location: String,
      rating: Number,
      title: String,
    },
  ],
});

// Export the model
module.exports = mongoose.model("JobDetail", jobDetailSchema);
