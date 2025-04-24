const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authenticate = require("../middleware/auth");

// All routes below are protected
router.use(authenticate);

// Create a new note
router.post("/", noteController.createNote);

// Get all notes for the logged-in user
router.get("/", noteController.getAllNotes);

// Get a specific note by ID
router.get("/:id", noteController.getNoteById);

// Update a specific note
router.put("/:id", noteController.updateNote);

// Delete a specific note
router.delete("/:id", noteController.deleteNote);

module.exports = router;
