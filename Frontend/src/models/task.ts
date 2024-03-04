export interface Task {
  id?: string;
  task: string;
  date: string;
  state: boolean;
}

export interface Change {
  task?: string;
  date?: string;
  state?: boolean;
}
