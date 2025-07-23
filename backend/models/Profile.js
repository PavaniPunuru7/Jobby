const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_details: {
    name: String,
    profile_image_url: String,
    short_bio: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
