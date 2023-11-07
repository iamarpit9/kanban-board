import { Column, Task } from "./types";

export const columns: Column[] = [
  {
    id: 101,
    title: "To Do",
    description:
      'The "To Do" column is where tasks that are on your team\'s to-do list or backlog are placed. These tasks have been identified and are awaiting action. ',
  },
  {
    id: 201,
    title: "In Progress",
    description:
      ' The "In Progress" column contains tasks that are actively being worked on by your team members. It provides a visual representation of work in motion and helps track ongoing progress. ',
  },
  {
    id: 301,
    title: "Completed",
    description:
      'The "Completed" column serves as the final destination for tasks that have been successfully completed. Tasks in this column are ready for review or delivery.',
  },
];

export const initialTasks: Task[] = [
  {
    id: 1,
    columnId: 101,
    title: "Task",
    content: "Task Column 1",
    dueDate: "11 Nov, 2023",
  },
  {
    id: 3,
    columnId: 301,
    title: "Task",
    content: "Task Column 3",
    dueDate: "4 Nov, 2023",
  },
  {
    id: 4,
    columnId: 101,
    title: "Task",
    content: "Task Column 4",
    dueDate: "11 Nov, 2023",
  },
  {
    id: 6,
    columnId: 301,
    title: "Task",
    content: "Task Column 6",
    dueDate: "4 Nov, 2023",
  },
  {
    id: 7,
    columnId: 101,
    title: "Task",
    content: "Task Column 7",
    dueDate: "11 Nov, 2023",
  },
  {
    id: 8,
    columnId: 201,
    title: "Task",
    content: "Task Column 8",
    dueDate: "9 Nov, 2023",
  },
  {
    id: 9,
    columnId: 301,
    title: "Task",
    content: "Task Column 9",
    dueDate: "4 Nov, 2023",
  },
  {
    id: 10,
    columnId: 101,
    title: "Task",
    content: "Task Column 10",
    dueDate: "11 Nov, 2023",
  },
  {
    id: 11,
    columnId: 201,
    title: "Task",
    content: "Task Column 11",
    dueDate: "9 Nov, 2023",
  },
];
