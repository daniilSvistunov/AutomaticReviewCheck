import { todoFilterByDate, todoFilterByTask } from '@redux/slices/todo';
import { dispatch, useSelector } from '@redux/store';

export default function TodoAddBar() {
  const { taskFilter, dateFilter } = useSelector((state) => state.todo.filter);

  return (
    <div id="todoAddBar">
      <form>
        <div>
          <input
            type="text"
            id="task"
            title="task"
            placeholder="Aufgabe"
            value={taskFilter}
            onChange={(e) => dispatch(todoFilterByTask(e.target.value))}
          />
        </div>
        <div>
          <input
            type="date"
            id="date"
            title="date"
            value={dateFilter}
            onChange={(e) => dispatch(todoFilterByDate(e.target.value))}
          />
        </div>
      </form>
    </div>
  );
}
