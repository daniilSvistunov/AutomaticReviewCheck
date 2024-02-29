import { useTasksDispatch } from './TasksProviderFunctions';
import { Task } from './types';

type Props = {
  type: string;
  name: string;
  task: Task;
};
export default function TodoTableEditCell({ type, name, task }: Readonly<Props>) {
  const dispatch = useTasksDispatch();
  const taskkey = name as keyof Task;
  return (
    <input
      type={type}
      id={name + task.id}
      name={name}
      value={
        type !== 'checkbox' && typeof task[taskkey] === 'string'
          ? (task[taskkey] as string)
          : undefined
      }
      checked={
        type !== 'checkbox' && typeof task[taskkey] === 'boolean'
          ? undefined
          : (task[taskkey] as boolean)
      }
      onChange={(e) => {
        if (dispatch) {
          dispatch({
            type: 'edit',
            id: task.id,
            change: {
              [e.target.name]: type !== 'checkbox' ? e.target.value : e.target.checked,
            },
          });
        }
      }}
    />
  );
}
