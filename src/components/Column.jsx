import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import React from "react";

export default function Column({ title, tasks, onEdit }) {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="
            bg-white/20
            backdrop-blur-xl
            p-5
            rounded-2xl
            shadow-lg
            w-full
            min-h-[450px]
            transition-all duration-300
            hover:shadow-xl
            border border-black/50
          "
        >
          {/* Column Header */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-black/80">{title}</h2>

              <span
                className="
                  bg-blue-100
                  text-blue-600
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  font-medium
                "
              >
                {tasks.length}
              </span>
            </div>

            {/* Separator Line */}
            <div className="border-b border-black/20"></div>
          </div>

          {/* Tasks */}
          <div className="space-y-3 mt-3">
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <TaskCard task={task} onEdit={onEdit} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
