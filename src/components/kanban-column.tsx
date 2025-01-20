import React, { useMemo, useState } from "react";
import { Column, Id, Task } from "../types/types";
import TrashIcon from "../icons/trash";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../icons/plus";
import { KanbanCard } from "./kanban-card";

export interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (taskId: Id) => void;
  updateTask: (id: Id, title: string) => void;
}

export const KanbanColumn = (props: KanbanColumnProps) => {
  const {
    column,
    tasks,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-40 border border-rose-500"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-cente items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full"></div>
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;

                setEditMode(false);
              }}
            />
          )}
          {!editMode && column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stoke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        onClick={() => createTask(column.id)}
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export default KanbanColumn;
