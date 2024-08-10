const express = require('express');
const Notes = require('../models/Notes');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

//Route 1 : Fetch all notes using get api/notes/fetchnotes
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2: Add notes api/notes/addnotes
router.post('/addnotes', fetchuser, [
    body('title', 'Enter Valid title').isLength({ min: 3 }),
    body('description', 'Enter Valid Description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id,
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
    }
})

//Route 3: Update an existing note /api/notes/updatenotes
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        let updatenote = await Notes.findById(req.params.id)

        if (!updatenote) {
            res.status(404).send("Not Notes Exists")
        }
        if (updatenote.user.toString() != req.user.id) {
            res.status(404).send("Not Allowed")
        }

        updatenote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ updatenote });

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
    }

})

//Route 4: Delete a note api/notes/deletenotes
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        let updatenote = await Notes.findById(req.params.id)

        if (!updatenote) {
            res.status(404).send("Not Notes Exists")
        }
        if (updatenote.user.toString() != req.user.id) {
            res.status(404).send("Not Allowed")
        }

        updatenote = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been successfully deleted", updatenote: updatenote });

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
    }
})

module.exports = router; 