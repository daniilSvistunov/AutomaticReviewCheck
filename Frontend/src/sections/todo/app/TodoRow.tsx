import { useSnackbar } from '@components/snackbar';
import { Task } from '@models/task';
import { ContentCopy, Delete, Edit, Info, Save } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import { addTodoTask, deleteTodoTask, updateTodoTask } from '@redux/slices/todo';
import { dispatch } from '@redux/store';
import { PATH_PAGE } from '@routes/paths';
import { useState } from 'react';
import { useNavigate } from 'react-router';
type Props = {
  task: Task;
};

export default function TodoRow({ task }: Readonly<Props>) {
  const [editable, setEditable] = useState(false);
  const [tempInput, setTempInput] = useState<Task>(task);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  async function handleDelete(id: string) {
    try {
      await dispatch(deleteTodoTask(id));
      enqueueSnackbar(`Das Löschen der Aufgabe war erfolgreich`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Fehler beim Löschen der Aufgabe "${task.task}"`, { variant: 'error' });
    }
  }

  async function handleDupe(task: Task) {
    delete task.id;
    try {
      await dispatch(addTodoTask(task));
      enqueueSnackbar(`Das Duplizieren der Aufgabe war erfolgreich`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Fehler beim Duplizieren der Aufgabe "${task.task}"`, { variant: 'error' });
    }
  }

  async function handleEdit(task: Task) {
    try {
      await dispatch(updateTodoTask(task));
      enqueueSnackbar(`Das Editieren der Aufgabe war erfolgreich`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Fehler beim Editieren der Aufgabe "${task.task}"`, { variant: 'error' });
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
        <IconButton
          color="secondary"
          title={editable ? 'Speichern' : 'Editieren'}
          onClick={() => {
            editable && handleEdit({ ...tempInput, id: task.id });
            setEditable((prevEdit) => !prevEdit);
          }}
        >
          {editable ? <Save /> : <Edit />}
        </IconButton>
        <IconButton
          color="secondary"
          title="Details"
          onClick={() => {
            navigate(`${PATH_PAGE.todo.root}/${task.id}`);
          }}
        >
          <Info />
        </IconButton>
        <IconButton color="secondary" title="Duplizieren" onClick={() => handleDupe({ ...task })}>
          <ContentCopy />
        </IconButton>
        {/*TODO: Bestätigung abfragen*/}
        <IconButton color="error" title="Löschen" onClick={() => task.id && handleDelete(task.id)}>
          <Delete />
        </IconButton>
      </td>
    </tr>
  );
}
