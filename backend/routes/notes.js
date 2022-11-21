const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


// Route 1 : Get all the notes using : GET "/api/notes/fetechallnotes". login required
router.get("/fetechallnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
});


// Route 2 : Add a new note using : POST "/api/notes/addnote". login required
router.post("/addnote", fetchuser, [
        body("title", "Enter a valid title").isLength({ min: 1 }),
        body("description", "It must be atleast 5 characters").isLength({ min: 1 }),
    ], async (req, res) => {
    
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
        const note = new Notes({ title, description, tag, user: req.user.id });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});


// Route 3 : Update an existing note using : PUT "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {

  const { title, description, tag } = req.body;

  try {
        // create a newNote object
        let newNote = {};

        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (tag) {
            newNote.tag = tag;
        }

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // allow updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});


// Route 4 : Delete note using : DELETE "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note has been deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
