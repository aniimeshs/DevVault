const express = require('express');
const app = express();

app.use(express.json());
const projectRoutes = require('./routes/projectRoutes');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes);

module.exports = app;