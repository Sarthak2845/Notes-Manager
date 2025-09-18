import React from 'react'

const NotesForm = ({ editingNote, noteForm, setNoteForm, onSubmit, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-[#31326F] mb-4">
                    {editingNote ? "Edit Note" : "Create New Note"}
                </h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Note title"
                        value={noteForm.title}
                        onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                        required
                    />
                    <textarea
                        placeholder="Note content"
                        value={noteForm.content}
                        onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-32 resize-none"
                        required
                    />
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="flex-1 bg-[#31326F] text-white py-2 rounded-lg hover:bg-[#2a2b5f]"
                        >
                            {editingNote ? "Update" : "Create"}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NotesForm
