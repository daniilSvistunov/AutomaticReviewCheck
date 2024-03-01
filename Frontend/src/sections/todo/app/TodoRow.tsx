import SvgColor from '@components/svg-color/SvgColor';
import { PATH_PAGE } from '@routes/paths';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Task } from '../../../models/task';
import { useTasksDispatch, useTasksId } from '../provider/tasksProviderFunctions';
import TodoTableEditCell from './TodoTableEditCell';
type Props = {
  task: Task;
};

export default function TodoRow({ task }: Readonly<Props>) {
  const [editable, setEditable] = useState(false);
  const dispatch = useTasksDispatch();
  const tempId = useTasksId();
  const navigate = useNavigate();
  return (
    <tr>
      <td>
        <TodoTableEditCell type={'checkbox'} name={'state'} task={task} />
      </td>
      <td className={task.state ? 'crossed' : ''}>
        {editable ? <TodoTableEditCell type={'text'} name={'task'} task={task} /> : task.task}
      </td>
      <td className={new Date() > new Date(task.date) ? 'expired' : ''}>
        {editable ? (
          <TodoTableEditCell type={'datetime-local'} name={'date'} task={task} />
        ) : (
          new Date(task.date).toLocaleString([], {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        )}
      </td>
      <td>
        <button
          title={editable ? 'Speichern' : 'Editieren'}
          className={'btn' + (editable ? ' greenBG' : '')}
          onClick={() => setEditable((prevEdit) => !prevEdit)}
        >
          {editable ? (
            <SvgColor src="/assets/icons/functions/floppy-disk-solid.svg" />
          ) : (
            <SvgColor src="/assets/icons/functions/pen-to-square-solid.svg" />
          )}
        </button>
        <button
          title="Details"
          className="btn"
          onClick={() => {
            navigate(`${PATH_PAGE.todo.root}/${task.id}`);
          }}
        >
          <SvgColor src="/assets/icons/functions/magnifying-glass-solid.svg" />
        </button>
        <button
          title="Duplizieren"
          className="btn"
          onClick={() => {
            if (dispatch) {
              dispatch({
                type: 'add',
                new: {
                  task: task.task,
                  date: task.date,
                  state: task.state,
                  id: tempId,
                },
              });
            }
          }}
        >
          <SvgColor src="/assets/icons/functions/copy-solid.svg" />
        </button>
        {/*TODO: Bestätigung abfragen*/}
        <button
          title="Löschen"
          className="btn redBG"
          onClick={() => {
            if (dispatch) {
              dispatch({
                type: 'delete',
                id: task.id,
              });
            }
          }}
        >
          <SvgColor src="/assets/icons/functions/trash-solid.svg" />
        </button>
      </td>
    </tr>
  );
}
