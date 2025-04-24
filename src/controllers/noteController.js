const Note = require('../models/Note');

// Create a new note
exports.createNote = async (req, res, next) => {
  try {
    const note = await Note.create({ ...req.body, user: req.user.id });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

// Get all notes for logged-in user with filters, tags, search, and sort
exports.getAllNotes = async (req, res, next) => {
  try {
    const { project, tags, sort, search } = req.query;
    const query = { user: req.user.id };

    if (project) query.project = project;

    if (tags) {
      const tagsArray = tags.split(',');
      query.tags = { $in: tagsArray };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive
      query.$or = [
        { title: searchRegex },
        { content: searchRegex }
      ];
    }

    let notesQuery = Note.find(query).populate('project', 'title'); // ✅ Populate project title

    if (sort) {
      const sortOptions = sort.split(',').join(' ');
      notesQuery = notesQuery.sort(sortOptions);
    }

    const notes = await notesQuery;
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

// Get a single note
exports.getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id }).populate('project', 'title');
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// Update a note
exports.updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found or unauthorized' });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// Delete a note
exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ error: 'Note not found or unauthorized' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    next(err);
  }
};
