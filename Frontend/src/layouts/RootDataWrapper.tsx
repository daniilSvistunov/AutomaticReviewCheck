import { Task } from '@models/task';
import { fetchTodoTasks } from '@redux/slices/todo';
import { dispatch, useSelector } from '@redux/store';
import { createContext, ReactNode, useEffect } from 'react';

// ----------------------------------------------------------------------
type Props = { children: ReactNode };

export const TasksContext = createContext<Task[]>([]);

function RootDataWrapper({ children }: Props) {
  const {
    status: { fetch: fetchTodoTasksStatus },
    tasks,
  } = useSelector((state) => state.todo);

  useEffect(() => {
    fetchTodoTasksStatus === 'idle' && dispatch(fetchTodoTasks());
  }, [fetchTodoTasksStatus, tasks]);

  //TODO sortieren

  return <TasksContext.Provider value={tasks}>{children}</TasksContext.Provider>;
}

export default RootDataWrapper;
