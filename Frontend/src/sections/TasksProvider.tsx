import { createContext, Dispatch, useEffect, useReducer } from 'react';

import tasksReducer, { TaskAction } from './tasksReducer';
import { Task } from './types';

type Props = {
  children: React.ReactNode;
};

export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<Dispatch<TaskAction> | null>(null);
export const TasksIdContext = createContext<number>(0);

//TODO: Daten an und von DB transferieren
export default function TasksProvider({ children }: Readonly<Props>) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    localStorage.getItem('taskData') ? JSON.parse(localStorage.getItem('taskData') as string) : []
  );
  //TODO: ID von DB beziehen
  const tempId =
    tasks === undefined || tasks.length === 0
      ? 0
      : Math.max(...tasks.map((task: Task) => task.id)) + 1;

  useEffect(() => {
    localStorage.setItem('taskData', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <TasksIdContext.Provider value={tempId}>{children}</TasksIdContext.Provider>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
