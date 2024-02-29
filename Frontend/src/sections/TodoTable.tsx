import SvgColor from '@components/svg-color/SvgColor';
import { useRef, useState } from 'react';

import { useTasks, useTasksDispatch, useTasksId } from './TasksProviderFunctions';
import TodoTableEditCell from './TodoTableEditCell';
import { Task } from './types';

type Props = {
  task: Task;
};

function TodoRow({ task }: Readonly<Props>) {
  const [editable, setEditable] = useState(false);
  const dispatch = useTasksDispatch();
  const tempId = useTasksId();
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
            <SvgColor src="/assets/icons/setting/ic_exit_full_screen.svg" />
          ) : (
            <SvgColor src="/assets/icons/setting/ic_exit_full_screen.svg" />
          )}
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
          <SvgColor src="/assets/icons/setting/ic_setting.svg" />
        </button>
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
          <SvgColor src="/assets/icons/setting/ic_setting.svg" />
        </button>
      </td>
    </tr>
  );
}

function TodoHead() {
  //TODO: Sortierung anzeigen
  const orderRef = useRef(1);
  const dispatch = useTasksDispatch();
  return (
    <thead>
      <tr>
        <th>Status</th>
        <th>
          <button
            onClick={() => {
              orderRef.current *= -1;
              if (dispatch) {
                dispatch({
                  type: 'sort',
                  column: 'task',
                  order: orderRef.current,
                });
              }
            }}
          >
            Aufgabe
          </button>
        </th>
        <th>
          <button
            onClick={() => {
              orderRef.current *= -1;
              if (dispatch) {
                dispatch({
                  type: 'sort',
                  column: 'date',
                  order: orderRef.current,
                });
              }
            }}
          >
            Datum
          </button>
        </th>
        <th>Funktionen</th>
      </tr>
    </thead>
  );
}

export default function TodoTable() {
  const tasks = useTasks();

  return (
    <div id="todoTable">
      <table>
        <TodoHead />
        <tbody>
          {tasks ? tasks.toReversed().map((row) => <TodoRow key={row.id} task={row} />) : []}
        </tbody>
      </table>
    </div>
  );
}
