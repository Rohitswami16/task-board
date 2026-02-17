import { useState, useEffect } from "react";
import React from "react";
export default function TaskModal({ onClose, onAdd, editTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || "");
      setPriority(editTask.priority || "Low");
      setDueDate(editTask.dueDate || "");
      setTags(editTask.tags?.join(", ") || "");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: all required
    if (!title.trim() || !description.trim() || !priority || !dueDate) {
      setError("All fields are required.");
      return;
    }

    // Validation: Due date must not be in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ignore time
    const selectedDate = new Date(dueDate);
    if (selectedDate < today) {
      setError("Due date cannot be in the past.");
      return;
    }

    const taskData = {
      id: editTask ? editTask.id : Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      column: editTask ? editTask.column : "Todo",
      createdAt: editTask ? editTask.createdAt : new Date().toISOString(),
    };

    onAdd(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] p-6 rounded-2xl shadow-2xl border border-black/50 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          {editTask ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              className="w-full border border-gray-300 rounded p-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Priority & Due Date */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Priority *
              </label>
              <select
                className="w-full border border-gray-300 rounded p-2 text-sm"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Select priority</option>
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Due Date *
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded p-2 text-sm"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (optional)
            </label>
            <input
              className="w-full border border-gray-300 rounded p-2 text-sm"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Created At */}
          {editTask && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created At
              </label>
              <input
                disabled
                value={new Date(editTask.createdAt).toLocaleString()}
                className="w-full border border-gray-300 bg-gray-100 rounded p-2 text-sm text-gray-500"
              />
            </div>
          )}

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 rounded text-sm text-white hover:bg-blue-700"
            >
              {editTask ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
