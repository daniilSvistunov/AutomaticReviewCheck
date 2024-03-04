import { TasksContext } from '@layouts/RootDataWrapper';
import { useContext, useMemo } from 'react';

import TodoHead from './TodoHead';
import TodoRow from './TodoRow';

export default function TodoTable() {
  const tasks = useContext(TasksContext);

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
