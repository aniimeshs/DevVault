const express = require("express");
const app = express();

app.use(express.json());
const projectRoutes = require("./src/routes/projectRoutes");
const noteRoutes = require("./src/routes/noteRoutes");
const authRoutes = require("./src/routes/authRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

// add after other routes
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = app;
