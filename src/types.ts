export type Id = string | number;

export type Column = {
  id: number;
  title: string;
  description: string;
};

export type Task = {
  id: number;
  columnId: Id;
  title: string;
  content: string;
  dueDate: string;
};
