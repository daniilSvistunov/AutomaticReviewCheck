import { useMemo } from 'react';

import { useTasks } from '../provider/tasksProviderFunctions';
import TodoHead from './TodoHead';
import TodoRow from './TodoRow';

export default function TodoTable() {
  const tasks = useTasks();

  const head = useMemo(() => {
    return <TodoHead />;
  }, []);

  return (
    <div id="todoTable">
      <table>
        {head}
        <tbody>
          {tasks ? tasks.toReversed().map((row) => <TodoRow key={row.id} task={row} />) : []}
        </tbody>
      </table>
    </div>
  );
}
