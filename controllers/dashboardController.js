const Project = require('../models/Project');
const Note = require('../models/Note');

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalProjects = await Project.countDocuments({ user: userId });
    const totalNotes = await Note.countDocuments({ user: userId });

    const statusBreakdown = await Project.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    res.json({ totalProjects, totalNotes, statusBreakdown });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
