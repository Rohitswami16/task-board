import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";

export default function ActivityLog() {
  const { state } = useContext(BoardContext);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 h-full">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">Activity Log</h2>

      {state.activityLog.length === 0 ? (
        <p className="text-sm text-gray-500">No activity yet...</p>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {state.activityLog.map((log, index) => (
            <li
              key={index}
              className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
            >
              {log}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
