import { LoadingScreenContainer } from '@components/loading-screen';
import useLocalStorage from '@hooks/useLocalStorage';
import { Task } from '@models/task';
import { fetchTasks, loadSettings, themeFetch, ThemeState } from '@redux/slices/tasks';
import { dispatch, useSelector } from '@redux/store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// ----------------------------------------------------------------------
type Props = { children: ReactNode };

type TasksContextType = {
  tasks: Task[];
  theme: ThemeState;
  // sortTasks: (tasks: Task[]) => void; // TODO: implement this function (move sortTask logic here)
  // sortTasks: () => void; // TODO: implement this function (move sortTask logic here)
};

export const TasksContext = createContext<TasksContextType>({} as TasksContextType);

const TaskDataWrapper = ({ children }: Props) => {
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  // const { theme } = useContext(TasksContext);
  // console.log(theme);
  // const [settings, setSettings] = useLocalStorage('settings', theme);
  // TODO: this can be usesd to fetch initial data that's used within the whole application
  /* Selectors are functions that know how to extract specific pieces of information from a store state value.
     As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data:
  */

  // TODO useState for Tasks (for what do i need to use useState here?)
  // TODO sort useState
  const {
    status: { fetch: fetchTasksStatus },
    tasks,
    theme,
  } = useSelector((state) => state.tasks);

  // const sortTasks = (tasks: Task[]) => {
  const sortTasks = () => {
    setSortedTasks([...tasks].sort((a, b) => a.title.localeCompare(b.title))); // TODO: Cannot access read-only property 'sort' of object
  };

  useEffect(() => {
    fetchTasksStatus === 'idle' && dispatch(fetchTasks());
    // dispatch(themeFetch());
    dispatch(loadSettings());
  }, [fetchTasksStatus, tasks, theme]);

  const isLoading = fetchTasksStatus !== 'succeeded';

  return (
    <>
      {isLoading ? (
        <LoadingScreenContainer />
      ) : (
        <TasksContext.Provider value={{ tasks: tasks, theme: theme }}>
          {children}
        </TasksContext.Provider>
      )}
    </>
  );
};

export default TaskDataWrapper;
