import { Column, Task } from "@/types";
import React, { useId, useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { columns, initialTasks } from "@/data";

const KanbanBoard: React.FC = () => {
  const colId = useMemo(() => columns.map((col) => col.id), []);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = () => {
    setActiveTask(null);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Dropping a TASK over another TASK
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping a TASK over a COLUMN
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const content = (
    <DragOverlay>
      {activeTask && <TaskCard task={activeTask} colTitle={null} />}
    </DragOverlay>
  );

  const contextId = useId();

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        px-[40px]"
    >
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        id={contextId}
      >
        <div className="m-auto flex gap-2 ">
          <div className="flex gap-4">
            <SortableContext items={colId}>
              {columns.map((col) => (
                <ColumnContainer
                  col={col}
                  key={col.id}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {typeof window === "object"
          ? createPortal(content, document.body)
          : null}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
