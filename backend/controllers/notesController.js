const Notes = require("../models/Notes.models")
const createNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newNote = new Notes({
            title,
            description,
            user: req.user.id
        });
        await newNote.save();
        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
const getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Notes.find({ user: userId }).sort({ createdAt: -1 });
        if (!notes) {
            return res.status(404).json({ message: "No notes found" });
        }
        res.status(200).json({ notes });
    } catch (error) {
        console.log("Error In Getting Notes", error.message);
        res.status(500).send("Internal Server Error");
    }
}
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Notes.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.status(200).json({ note });
    } catch (error) {
        console.log("Error In Getting Note", error.message);
        res.status(500).send("Internal Server Error");
    }
}
const updateNote = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body is required" });
        }
        const { title, description } = req.body;
        const { id } = req.params;
        let note = await Notes.findById(id);
        if (!note) {
            console.log("Note not found");
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "You are not authorized to update this note" });
        }

        note.title = title || note.title;
        note.description = description || note.description;
        const updatedNote = await note.save();
        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        console.log("Error In Updating Note", error.message);
        res.status(500).send("Internal Server Error");
    }
}
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Notes.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "You are not authorized to delete this note" });
        }
        await Notes.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log("Error In Deleting Note", error.message);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote }