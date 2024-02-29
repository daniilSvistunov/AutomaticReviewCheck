export interface Task {
  id: number;
  task: string;
  date: string;
  state: boolean;
}

export interface Change {
  task?: string;
  date?: string;
  state?: boolean;
}
