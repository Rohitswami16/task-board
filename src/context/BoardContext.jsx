import { createContext, useReducer, useEffect } from "react";
import { loadTasks, saveTasks } from "../utils/storage";

export const BoardContext = createContext();

const initialState = {
  tasks: loadTasks() || [],
  activityLog: [],
};

function boardReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        activityLog: [
          `Task "${action.payload.title}" created in ${action.payload.column}`,
          ...state.activityLog,
        ],
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        ),
        activityLog: [
          `Task "${action.payload.title}" updated`,
          ...state.activityLog,
        ],
      };

    case "DELETE_TASK":
      const taskToDelete = state.tasks.find((t) => t.id === action.payload.id);
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
        activityLog: [
          `Task "${taskToDelete?.title}" deleted`,
          ...state.activityLog,
        ],
      };

    case "MOVE_TASK":
      return {
        ...state,
        tasks: action.payload.tasks,
        activityLog: [
          `Task "${action.payload.title}" moved to ${action.payload.column}`,
          ...state.activityLog,
        ],
      };

    case "RESET":
      return { tasks: [], activityLog: [] };

    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  useEffect(() => {
    saveTasks(state.tasks);
  }, [state.tasks]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
