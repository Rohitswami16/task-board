import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import React from "react";

export default function TaskCard({ task, onEdit }) {
  const { dispatch } = useContext(BoardContext);

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TASK",
      payload: { id: task.id },
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl mb-3 shadow-md border border-white/30 hover:shadow-lg transition-all duration-200 relative cursor-pointer">
      {/* Top Row: Title + Buttons */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
          {task.title}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
            task.priority === "High"
              ? "bg-red-100 text-red-600"
              : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-600"
                : task.priority === "Low"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
          }`}
        >
          {task.priority || "N/A"}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags & Priority Row */}
      <div className="flex flex-wrap justify-between items-center mt-2 gap-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {task.tags &&
            task.tags.length > 0 &&
            task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Priority */}

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-xs px-2 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="text-xs px-2 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
