import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NotesForm from "../components/NotesForm";
import NoteDetailModal from "../components/NoteDetailModal";
import { Plus, Search, StickyNote } from "lucide-react";
import { notesAPI } from "../api";
import Popup from "../components/Popup";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [popup, setPopup] = useState({ isVisible: false, type: "error", message: "" });
  const [noteForm, setNoteForm] = useState({ title: "", content: "" });
  const [viewingNote, setViewingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await notesAPI.getAll();
      const notesData = res.data.notes || [];
      setNotes(Array.isArray(notesData) ? notesData : []);
    } catch (error) {
      setNotes([]);
      setPopup({ isVisible: true, type: "error", message: "Failed to fetch notes" });
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      await notesAPI.create({
        title: noteForm.title,
        description: noteForm.content
      });
      setPopup({ isVisible: true, type: "success", message: "Note created successfully" });
      setNoteForm({ title: "", content: "" });
      setShowCreateModal(false);
      fetchNotes();
    } catch (error) {
      setPopup({ isVisible: true, type: "error", message: "Failed to create note" });
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        title: noteForm.title,
        description: noteForm.content
      };
      console.log("Updating note with data:", updateData);
      console.log("Note ID:", editingNote._id);
      
      await notesAPI.update(editingNote._id, updateData);
      setPopup({ isVisible: true, type: "success", message: "Note updated successfully" });
      setNoteForm({ title: "", content: "" });
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update note";
      setPopup({ isVisible: true, type: "error", message: errorMessage });
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await notesAPI.delete(id);
      setPopup({ isVisible: true, type: "success", message: "Note deleted successfully" });
      fetchNotes();
    } catch (error) {
      setPopup({ isVisible: true, type: "error", message: "Failed to delete note" });
    }
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setNoteForm({ title: note.title, content: note.description });
  };

  const filteredNotes = Array.isArray(notes) ? notes.filter(note =>
    note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  return (
    <div className="min-h-screen ">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#31326F] mb-4">
              Welcome to Your Notes
            </h1>
            <p className="text-lg text-[#637AB9] max-w-2xl mx-auto">
              Organize your thoughts, ideas, and important information in one place
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search your notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 w-full rounded-xl border-2 border-[#637AB9] bg-gray-50
                           text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-[#31326F] focus:border-[#31326F] focus:bg-white
                           transition-all duration-200"
                />
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl
                         bg-[#31326F] hover:bg-[#2a2b5f] text-white font-semibold
                         shadow-md hover:shadow-lg transition-all duration-200
                         transform hover:scale-105 lg:w-auto w-full"
              >
                <Plus className="h-5 w-5" />
                <span>Create New Note</span>
              </button>
            </div>
          </div>

        

          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={openEditModal}
                  onDelete={handleDeleteNote}
                  onView={setViewingNote}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <StickyNote className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-[#31326F] mb-3">
                  No notes yet
                </h3>
                <p className="text-[#637AB9] mb-6">
                  Start creating your first note to organize your thoughts
                </p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-[#31326F] hover:bg-[#2a2b5f] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Create Your First Note
                </button>
              </div>
            </div>
          )}

          {(showCreateModal || editingNote) && (
            <NotesForm
              editingNote={editingNote}
              noteForm={noteForm}
              setNoteForm={setNoteForm}
              onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
              onCancel={() => {
                setShowCreateModal(false);
                setEditingNote(null);
                setNoteForm({ title: "", content: "" });
              }}
            />
          )}

          <NoteDetailModal
            note={viewingNote}
            isOpen={!!viewingNote}
            onClose={() => setViewingNote(null)}
          />

          <Popup
            isVisible={popup.isVisible}
            onClose={() => setPopup({ ...popup, isVisible: false })}
            type={popup.type}
            message={popup.message}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
