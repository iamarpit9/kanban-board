import { Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  colTitle: string | "To Do" | "Completed" | "In Progress" | null;
}

const TaskCard: React.FC<Props> = ({ task, colTitle }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`        opacity-30
      bg-mainBackgroundColor p-2.5 my-2  h-[100px] min-h-[80px] items-center flex text-left rounded-xl border-2 ${
        colTitle == "To Do"
          ? "border-blue-500"
          : colTitle == "In Progress"
          ? "border-green-500"
          : "border-rose-500"
      }  cursor-grab relative`}
      />
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-mainBackgroundColor p-2.5 my-2 h-[100px] min-h-[80px]  flex flex-col text-left rounded-xl  ${
          colTitle == "To Do"
            ? "hover:ring-2 hover:ring-inset hover:ring-blue-500"
            : colTitle == "In Progress"
            ? "hover:ring-2 hover:ring-inset hover:ring-green-500"
            : colTitle == "Completed"
            ? "hover:ring-2 hover:ring-inset hover:ring-rose-500"
            : ""
        }  relative cursor-grab task`}
      >
        {task.title}
        <p className="text-sm font-thin">{task.content}</p>
        <div className="text-right text-xs underline"> Due: {task.dueDate}</div>
      </div>
    </>
  );
};

export default TaskCard;
