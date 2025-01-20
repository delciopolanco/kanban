import React, { useMemo, useState } from "react";
import PlusIcon from "../icons/plus";
import { Column, Id, Task } from "../types/types";
import KanbanColumn from "./kanban-column";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { KanbanCard } from "./kanban-card";

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsId = useMemo(() => {
    return columns.map((col) => col.id);
  }, [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleCreateColumn = () => {
    const columnsToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    } as Column;

    setColumns([...columns, columnsToAdd]);
  };

  const handleDeleteColumn = (id: Id) => {
    const filtered = columns.filter((column) => column.id !== id);
    setColumns(filtered);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  };

  const handleUpdateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;

      return { ...col, title };
    });

    setColumns(newColumns);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // TASK over a TASK

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // TASK over a COLUMN

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((task) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const handleCreateTask = (columnId: Id) => {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    } as Task;

    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: Id) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const handleUpdateTask = (taskId: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;

      return {
        ...task,
        content,
      };
    });
    setTasks(newTasks);
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  deleteColumn={handleDeleteColumn}
                  updateColumn={handleUpdateColumn}
                  createTask={handleCreateTask}
                  deleteTask={handleDeleteTask}
                  updateTask={handleUpdateTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={handleCreateColumn}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
          >
            <PlusIcon /> Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumn
                column={activeColumn}
                deleteColumn={handleCreateColumn}
                updateColumn={handleUpdateColumn}
                createTask={handleCreateTask}
                deleteTask={handleDeleteTask}
                updateTask={handleUpdateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}

            {activeTask && (
              <KanbanCard
                task={activeTask}
                deleteTask={handleDeleteTask}
                updateTask={handleUpdateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

const generateId = () => Math.floor(Math.random() * 1000);

export default KanbanBoard;
