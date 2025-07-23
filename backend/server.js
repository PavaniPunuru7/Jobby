const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Route imports
const jobsRoute = require("./routes/jobs");
const jobDetailsRoute = require("./routes/jobDetails");
const profileRoute = require("./routes/profile");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", jobsRoute);
app.use("/api/job-details", jobDetailsRoute);
app.use("/api/profile", profileRoute);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    // Start server after DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });
