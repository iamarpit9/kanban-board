import { Column, Task } from "@/types";
import TaskCard from "./TaskCard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";

interface Props {
  col: Column;
  tasks: Task[];
}

const ColumnContainer: React.FC<Props> = ({ col, tasks }) => {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, attributes, listeners } = useSortable({
    id: col.id,
    data: {
      type: "Column",
      col,
    },
  });

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="
   bg-columnBackgroundColor
   w-[350px]
   h-[610px]
   max-h-[700px]
   rounded-md
   flex
   flex-col
    mx-[30px]
  "
      >
        <div
          className={` bg-mainBackgroundColor
      text-md
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-columnBackgroundColor
      border-4
      text-left ${
        col.title == "To Do"
          ? "text-blue-500"
          : col.title == "In Progress"
          ? "text-green-500"
          : "text-rose-500"
      } 	`}
        >
          {col.title}
          <p className="text-sm font-thin">{col.description}</p>
        </div>

        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard task={task} key={task.id} colTitle={col.title} />
            ))}
          </SortableContext>
        </div>
      </div>
    </>
  );
};

export default ColumnContainer;
