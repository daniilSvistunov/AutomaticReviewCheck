import { useSnackbar } from '@components/snackbar';
import { Task } from '@models/task';
import { ContentCopy, Delete, Edit, Info, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Checkbox, IconButton, styled, TableCell, TableRow, TextField } from '@mui/material';
import { addTodoTask, deleteTodoTask, updateTodoTask } from '@redux/slices/todo';
import { dispatch } from '@redux/store';
import { PATH_PAGE } from '@routes/paths';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type Props = {
  task: Task;
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#1e90ff0a',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '18px',
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '50%',
  padding: '8px',
  minWidth: 'fit-content',
}));

export default function TodoRow({ task }: Readonly<Props>) {
  const [editable, setEditable] = useState(false);
  const [tempInput, setTempInput] = useState<Task>(task);
  const [loading, setLoading] = useState({ edit: false, delete: false, dupe: false });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function handleDelete(id: string) {
    try {
      setLoading({ ...loading, delete: true });
      await dispatch(deleteTodoTask(id));
      enqueueSnackbar(`Das Löschen der Aufgabe war erfolgreich`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Fehler beim Löschen der Aufgabe "${task.task}"`, { variant: 'error' });
    }
    setLoading({ ...loading, delete: false });
  }

  async function handleDupe(task: Task) {
    delete task.id;
    try {
      setLoading({ ...loading, dupe: true });
      await dispatch(addTodoTask(task));
      enqueueSnackbar(`Das Duplizieren der Aufgabe war erfolgreich`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Fehler beim Duplizieren der Aufgabe "${task.task}"`, { variant: 'error' });
    }
    setLoading({ ...loading, dupe: false });
  }

  async function handleEdit(task: Task) {
    if (editable) {
      try {
        setLoading({ ...loading, edit: true });
        await dispatch(updateTodoTask(task));
        enqueueSnackbar(`Das Editieren der Aufgabe war erfolgreich`, { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(`Fehler beim Editieren der Aufgabe "${task.task}"`, { variant: 'error' });
      }
    }
    setLoading({ ...loading, edit: false });
    setEditable((prevEdit) => !prevEdit);
  }

  return (
    <StyledTableRow>
      <StyledTableCell sx={{ width: '10%' }}>
        {editable ? (
          <Checkbox
            id={`state${task.id}`}
            name={'state'}
            checked={tempInput.state}
            onChange={(e) => setTempInput({ ...tempInput, [e.target.name]: e.target.checked })}
          />
        ) : (
          <Checkbox checked={task.state} disabled />
        )}
      </StyledTableCell>
      <StyledTableCell className={task.state ? 'crossed' : ''} sx={{ width: '55%' }}>
        {editable ? (
          <TextField
            id={`task${task.id}`}
            name={'task'}
            value={tempInput.task}
            onChange={(e) => setTempInput({ ...tempInput, [e.target.name]: e.target.value })}
          />
        ) : (
          task.task
        )}
      </StyledTableCell>
      <StyledTableCell
        className={new Date() > new Date(task.date) ? 'expired' : ''}
        sx={{ width: '15%' }}
      >
        {editable ? (
          <TextField
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
      </StyledTableCell>
      <StyledTableCell sx={{ width: '20%' }}>
        <StyledLoadingButton
          sx={{ color: '#00aa00' }}
          title={editable ? 'Speichern' : 'Editieren'}
          loading={loading.edit}
          onClick={() => {
            handleEdit({ ...tempInput, id: task.id });
          }}
        >
          {editable ? <Save /> : <Edit sx={{ color: '#1e90ff' }} />}
        </StyledLoadingButton>
        <IconButton
          sx={{ color: '#1e90ff' }}
          title="Details"
          onClick={() => {
            navigate(`${PATH_PAGE.todo.root}/${task.id}`);
          }}
        >
          <Info />
        </IconButton>
        <StyledLoadingButton
          loading={loading.dupe}
          sx={{ color: '#1e90ff' }}
          title="Duplizieren"
          onClick={() => handleDupe({ ...task })}
        >
          <ContentCopy />
        </StyledLoadingButton>
        {/*TODO: Bestätigung abfragen*/}
        <StyledLoadingButton
          loading={loading.delete}
          color="error"
          title="Löschen"
          onClick={() => task.id && handleDelete(task.id)}
        >
          <Delete />
        </StyledLoadingButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
