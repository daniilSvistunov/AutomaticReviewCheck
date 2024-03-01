import { useContext } from 'react';

import { TasksContext, TasksDispatchContext, TasksIdContext } from './TasksProvider';

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

export function useTasksId() {
  return useContext(TasksIdContext);
}
