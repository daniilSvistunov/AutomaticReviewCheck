import SvgColor from '@components/svg-color/SvgColor';
import { addTodoTask, deleteTodoTask, updateTodoTask } from '@redux/slices/todo';
import { dispatch } from '@redux/store';
import { PATH_PAGE } from '@routes/paths';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Task } from '../../../models/task';
type Props = {
  task: Task;
};

export default function TodoRow({ task }: Readonly<Props>) {
  const [editable, setEditable] = useState(false);
  const [tempInput, setTempInput] = useState<Task>(task);
  const navigate = useNavigate();

  async function handleDelete(id: string) {
    try {
      await dispatch(deleteTodoTask(id));
    } catch (error) {
      //TODO error handling
      console.log(error);
    }
  }

  async function handleDupe(task: Task) {
    delete task.id;
    try {
      await dispatch(addTodoTask(task));
    } catch (error) {
      //TODO error handling
      console.log(error);
    }
  }

  async function handleEdit(task: Task) {
    try {
      await dispatch(updateTodoTask(task));
    } catch (error) {
      //TODO error handling
      console.log(error);
    }
  }

  return (
    <tr>
      <td>
        {editable ? (
          <input
            type="checkbox"
            id={`state${task.id}`}
            name={'state'}
            checked={tempInput.state}
            onChange={(e) => setTempInput({ ...tempInput, [e.target.name]: e.target.checked })}
          />
        ) : (
          <input type="checkbox" checked={task.state} readOnly />
        )}
      </td>
      <td className={task.state ? 'crossed' : ''}>
        {editable ? (
          <input
            type="text"
            id={`task${task.id}`}
            name={'task'}
            value={tempInput.task}
            onChange={(e) => setTempInput({ ...tempInput, [e.target.name]: e.target.value })}
          />
        ) : (
          task.task
        )}
      </td>
      <td className={new Date() > new Date(task.date) ? 'expired' : ''}>
        {editable ? (
          <input
            type="datetime-local"
            id={`date${task.id}`}
            name={'date'}
            value={tempInput.date}
            onChange={(e) => setTempInput({ ...tempInput, [e.target.name]: e.target.value })}
          />
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
          className={`btn + ${editable ? ' greenBG' : ''}`}
          onClick={() => {
            editable && handleEdit({ ...tempInput, id: task.id });
            setEditable((prevEdit) => !prevEdit);
          }}
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
        <button title="Duplizieren" className="btn" onClick={() => handleDupe({ ...task })}>
          <SvgColor src="/assets/icons/functions/copy-solid.svg" />
        </button>
        {/*TODO: Bestätigung abfragen*/}
        <button
          title="Löschen"
          className="btn redBG"
          onClick={() => task.id && handleDelete(task.id)}
        >
          <SvgColor src="/assets/icons/functions/trash-solid.svg" />
        </button>
      </td>
    </tr>
  );
}
