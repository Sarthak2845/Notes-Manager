import React from "react";
import { Edit, Trash2 } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete, onView }) => {
  return (
    <div 
      onClick={() => onView(note)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 border-b-4 border-[#31326F]
                 transition-all duration-200 transform hover:scale-105 cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-[#31326F] mb-3 line-clamp-2">
        {note.title}
      </h3>
      <p className="text-[#637AB9] text-sm mb-4 line-clamp-6">
        {note.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="p-1 hover:text-[#31326F] transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note._id);
            }}
            className="p-1 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;