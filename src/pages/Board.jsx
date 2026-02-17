import { useContext, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column";
import { useNavigate } from "react-router-dom";
import TaskModal from "../components/TaskModal";
import ActivityLog from "../components/ActivityLog";

const columns = ["Todo", "Doing", "Done"];

export default function Board() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(BoardContext);

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortDueDate, setSortDueDate] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    navigate("/login");
  };

  const handleAddOrUpdateTask = (task) => {
    // Validation: Mandatory Fields
    if (
      !task.title?.trim() ||
      !task.description?.trim() ||
      !task.priority ||
      !task.dueDate
    ) {
      alert("Title, Description, Priority, and Due Date are required.");
      return;
    }

    // Validation: Due Date not in past
    if (new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
      alert("Due date cannot be in the past.");
      return;
    }

    if (editTask) {
      dispatch({ type: "UPDATE_TASK", payload: task });
    } else {
      dispatch({ type: "ADD_TASK", payload: task });
    }

    setEditTask(null);
    setShowModal(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceTasks = state.tasks.filter(
      (task) => task.column === source.droppableId,
    );
    const movedTask = sourceTasks[source.index];

    const updatedTasks = state.tasks.map((task) =>
      task.id === movedTask.id
        ? { ...task, column: destination.droppableId }
        : task,
    );

    dispatch({
      type: "MOVE_TASK",
      payload: {
        tasks: updatedTasks,
        title: movedTask.title,
        column: destination.droppableId,
      },
    });
  };

  const getProcessedTasks = (column) =>
    state.tasks
      .filter((t) => t.column === column)
      .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
      .filter((t) =>
        filterPriority === "All" ? true : t.priority === filterPriority,
      )
      .sort((a, b) => {
        if (!sortDueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          🚀 Task Board
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditTask(null);
              setShowModal(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            + Add Task
          </button>
          {/* Reset Board */}
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to reset the board? This will delete all tasks.",
                )
              ) {
                dispatch({ type: "RESET" });
              }
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            🔄 Reset Board
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-md border border-gray-200">
        <input
          type="text"
          placeholder="🔍 Search by title"
          className="flex-1 min-w-[200px] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-4 py-2.5 rounded-xl transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-4 py-2.5 rounded-xl transition"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>

        <button
          onClick={() => setSortDueDate(!sortDueDate)}
          className={`px-5 py-2 rounded-xl font-medium shadow-md transition-all duration-200 ${
            sortDueDate
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          📅 Sort by Due Date
        </button>
      </div>

      {/* Board + Activity Log */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columns */}
          
          <div className="lg:col-span-3 flex flex-wrap gap-8">
            {columns.map((col) => (
              <Column
                key={col}
                title={col}
                tasks={getProcessedTasks(col)}
                onEdit={(task) => {
                  setEditTask(task);
                  setShowModal(true);
                }}
              />
            ))}
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-1">
            <ActivityLog />
          </div>
        </div>
      </DragDropContext>

      {/* Modal */}
      {showModal && (
        <TaskModal
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
          onAdd={handleAddOrUpdateTask}
          editTask={editTask}
        />
      )}
    </div>
  );
}
