exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!project) return res.status(404).json({ error: 'Project not found or unauthorized' });

    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
