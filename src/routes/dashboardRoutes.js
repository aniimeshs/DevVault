const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../src/controllers/dashboardController");
const auth = require("../middleware/auth");

router.get("/", auth, getDashboardStats);

module.exports = router;
