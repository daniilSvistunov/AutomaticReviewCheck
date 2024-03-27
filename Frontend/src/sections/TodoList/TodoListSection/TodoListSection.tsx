import { Task } from '@models/interfaces';
import { List, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import { useSelector } from '@redux/store';
import { TransitionGroup } from 'react-transition-group';

import TodoItem from '../TodoItem/TodoItem';

function TodoListSection() {
  const list = useSelector((state) => state.list);

  const l = list.tasks;
  const filteredList = l.filter(
    (task) =>
      (list.importance_filter === task.importance || list.importance_filter === undefined) &&
      task.todo.includes(list.string_filter)
  );
  return (
    <Stack sx={{ margin: '1rem' }}>
      <Paper
        elevation={16}
        sx={{ maxHeight: '900px', overflow: 'auto', minHeight: '400px', marginBottom: '16px' }}
      >
        <List>
          {filteredList.map((todo: Task, index) => (
            <TodoItem key={index} Task={todo} index={index} />
          ))}
        </List>
      </Paper>
    </Stack>
  );
}

export default TodoListSection;
