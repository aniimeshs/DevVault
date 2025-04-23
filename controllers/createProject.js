exports.createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      user: req.user.id, // Attach logged-in user's ID from token
    };

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ This uses req.user.id which was decoded from JWT using the auth middleware.