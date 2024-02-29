import { Change, Task } from './types';

interface EditAction {
  type: 'edit';
  id: number;
  change: Change;
}

interface AddAction {
  type: 'add';
  new: Task;
}

interface DeleteAction {
  type: 'delete';
  id: number;
}

interface SortAction {
  type: 'sort';
  column: string;
  order: number;
}

export type TaskAction = AddAction | DeleteAction | SortAction | EditAction;

//Generic sort considering order. toLowerCase() for comparing text
function compare<T>(val1: T, val2: T, order: number): number {
  if (typeof val1 === 'string' && typeof val2 === 'string') {
    if (val1.toLowerCase() > val2.toLowerCase()) {
      return order;
    }
    return val2.toLowerCase() > val1.toLowerCase() ? -order : 0;
  }
  if (val1 > val2) {
    return order;
  }
  return val2 > val1 ? -order : 0;
}

export default function tasksReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
    case 'add': {
      return [...tasks, { ...action.new }];
    }
    case 'delete': {
      return tasks.filter((task) => task.id !== action.id);
    }
    case 'edit': {
      return tasks.map((task) => {
        return task.id === action.id ? { ...task, ...action.change } : task;
      });
    }
    case 'sort': {
      const taskkey = action.column as keyof Task;
      return [...tasks].sort((a, b) => {
        return compare(a[taskkey], b[taskkey], action.order);
      });
    }
  }
}
