export enum Priority {
  HIGH = 'Hoch',
  MEDIUM = 'Mittel',
  LOW = 'Niedrig',
}

export interface Step {
  id: number;
  text: string;
}

export interface Task {
  id: number;
  title: string;
  checked: boolean;
  due: Date;
  reminder?: Duration;
  priority?: Priority;
  bucket?: string;
  team?: string;
  assignee?: string;
  note?: string;
  steps: Step[];
}
