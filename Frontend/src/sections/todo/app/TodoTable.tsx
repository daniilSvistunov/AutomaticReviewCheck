import { Filter } from '@components/advanced-filter';
import { applyAdvancedFilter } from '@components/advanced-filter/AdvancedFilter';
import { Task } from '@models/task';
import { SortTypes } from '@redux/slices/todo';
import { useSelector } from '@redux/store';
import { useMemo } from 'react';

import TodoHead from './TodoHead';
import TodoRow from './TodoRow';
import { sortByTaskType } from './types';

export default function TodoTable() {
  const {
    filter: { sortingOrder, taskFilter, dateFilter },
    tasks,
  } = useSelector((state) => state.todo);

  const head = useMemo(() => {
    return <TodoHead />;
  }, []);

  //Filter the tasks according to the filter values in the Redux Slice with the AdvancedFilter Component
  const filteredTasks = useMemo(() => {
    const filter: Filter<Task> = [
      { label: 'task', type: 'text', value: taskFilter, key: 'task' },
      { label: 'date', type: 'date', value: dateFilter, key: 'date' },
    ];
    return applyAdvancedFilter(tasks, filter);
  }, [tasks, dateFilter, taskFilter]);

  //Sort the filtered tasks according to the sortingOrder saved in the Redux Slice
  const sortedTasks = useMemo(() => {
    return sortTasks({ tasks: filteredTasks, sortingOrder });
  }, [filteredTasks, sortingOrder]);

  return (
    <div id="todoTable">
      <table>
        {head}
        <tbody>
          {sortedTasks ? sortedTasks.map((row) => <TodoRow key={row.id} task={row} />) : []}
        </tbody>
      </table>
    </div>
  );
}

const sortByTask: sortByTaskType = (a, b) => (a.task.toLowerCase() > b.task.toLowerCase() ? -1 : 1);
const sortByDate: sortByTaskType = (a, b) => {
  const dateA = a.date == 'INVALID_DATE' ? new Date() : new Date(a.date);
  const dateB = b.date == 'INVALID_DATE' ? new Date() : new Date(b.date);
  return dateA > dateB ? -1 : 1;
};

const sortTasks = ({ tasks, sortingOrder }: { tasks: Task[]; sortingOrder: SortTypes }) => {
  const sortingLookup = {
    [SortTypes.TaskAscending]: (tasks: Task[]) => [...tasks.toSorted((a, b) => sortByTask(b, a))],
    [SortTypes.TaskDescending]: (tasks: Task[]) => [...tasks.toSorted((a, b) => sortByTask(a, b))],
    [SortTypes.DateAscending]: (tasks: Task[]) => [...tasks.toSorted((a, b) => sortByDate(b, a))],
    [SortTypes.DateDescending]: (tasks: Task[]) => [...tasks.toSorted((a, b) => sortByDate(a, b))],
  };
  return sortingLookup[SortTypes[sortingOrder]](tasks) || tasks;
};
