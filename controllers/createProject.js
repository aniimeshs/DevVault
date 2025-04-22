exports.createProject = async (req, res) => {
  try {
    const { title, description, techStack, status } = req.body;

    const project = await Project.create({
      title,
      description,
      techStack,
      status,
      user: req.user.id
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
