import React from "react";
import { X } from "lucide-react";

const NoteDetailModal = ({ note, isOpen, onClose }) => {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-[#31326F]">{note.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="text-[#637AB9] whitespace-pre-wrap">
          {note.description}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailModal;