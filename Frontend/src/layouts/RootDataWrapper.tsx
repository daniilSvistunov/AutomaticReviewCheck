import { Task } from '@models/task';
import { fetchTodoTasks } from '@redux/slices/todo';
import { dispatch, useSelector } from '@redux/store';
import { createContext, ReactNode, useEffect } from 'react';

// ----------------------------------------------------------------------
type Props = { children: ReactNode };

function RootDataWrapper({ children }: Readonly<Props>) {
  const {
    status: { fetch: fetchTodoTasksStatus },
    tasks,
  } = useSelector((state) => state.todo);

  useEffect(() => {
    fetchTodoTasksStatus === 'idle' && dispatch(fetchTodoTasks());
  }, [fetchTodoTasksStatus, tasks]);

  return <>{children}</>;
}

export default RootDataWrapper;
