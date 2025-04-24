const Project = require('../models/Project');
const Note = require('../models/Note');

exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user.id // ✅ Attach authenticated user's ID from JWT
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const { status, sort } = req.query;
    const query = { user: req.user.id };

    if (status) {
      query.status = status;
    }

    let projectQuery = Project.find(query);

    if (sort) {
      const sortBy = sort.split(',').join(' ');
      projectQuery = projectQuery.sort(sortBy);
    } else {
      projectQuery = projectQuery.sort('-createdAt'); // Default: newest first
    }

    const projects = await projectQuery;
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    const notes = await Note.find({ project: project._id, user: req.user.id });

    res.json({ project, notes }); // ✅ send project + notes together
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to update this project' });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
};
