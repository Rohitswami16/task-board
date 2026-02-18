import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import React from "react";

export default function ActivityLog() {
  const { state } = useContext(BoardContext);

  return (
    <div className="bg-white/20 backdrop-blur-md shadow-lg p-5 rounded-2xl border border-black/50 h-auto   min-h-[450px] lg:h-full">
      <h2 className="text-lg font-semibold text-black/80">Activity Log</h2>
      <div className="border-b border-black/20 my-3"></div>

      {state.activityLog.length === 0 ? (
        <p className="text-sm text-black/60">No activity yet...</p>
      ) : (
        <ul className="space-y-3 max-h-72 sm:max-h-96 overflow-y-auto pr-2">
          {state.activityLog.map((log, index) => (
            <li
              key={index}
              className="text-sm bg-white/30 text-black/80 p-3 rounded-lg border border-black/20 hover:bg-white/40 transition"
            >
              {log}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
