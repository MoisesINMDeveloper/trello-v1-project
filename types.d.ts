// types.ts

export interface UserData {
  id: number;
  username: string;
  name: string;
  email: string;
  verified: boolean;
  tasks: Task[];
}

export interface UserError {
  message: string;
  // Añadir más campos según sea necesario
}

export interface Status {
  id: number;
  name?: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: number;
  userId: number;
  username: string; // Añadir el campo username
}

export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  statusId: number;
  userId: number;
  comments: Comment[];
  status: Status;
}
