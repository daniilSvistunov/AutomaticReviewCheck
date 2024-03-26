import i18n from '@locales/i18n';
import { Task } from '@models/interfaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {
  Button,
  ButtonGroup,
  Checkbox,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Stack } from '@mui/system';
import { removeTask } from '@redux/slices/list';
import { useDispatch } from '@redux/store';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface props {
  Task: Task;
}

function TodoItem({ Task }: props) {
  const [isChecked, setIsChecked] = useState(Task.Finished);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function DeleteTodo(itemDelete: Task) {
    dispatch(removeTask(itemDelete));
  }
  function change() {
    if (isChecked) {
      return 'line-through';
    }
    return 'none';
  }
  function chooseIcon(task: Task) {
    switch (task.importance) {
      case 1:
        return (
          <Tooltip
            title={`${i18n.t('todoList.importanceSelect.select.0', { returnObjects: true })}`}
          >
            <ErrorIcon color="error" sx={{ justifySelf: 'center' }} />
          </Tooltip>
        );
      case 2:
        return (
          <Tooltip
            title={`${i18n.t('todoList.importanceSelect.select.1', { returnObjects: true })}`}
          >
            <ReportProblemIcon color="warning" />
          </Tooltip>
        );
      case 3:
        return (
          <Tooltip
            title={`${i18n.t('todoList.importanceSelect.select.2', { returnObjects: true })}`}
          >
            <CheckCircleIcon color="success" />
          </Tooltip>
        );
      default:
        return '?';
    }
  }
  return (
    <Stack direction={'row'} sx={{ marginRight: '1rem' }}>
      <ListItemButton onClick={() => setIsChecked(!isChecked)}>
        <Checkbox onChange={() => setIsChecked(!isChecked)} size="large" checked={isChecked} />
        <ListItemText primary={Task.todo} secondary={Task.Date} sx={{ textDecoration: change() }} />
        <ListItemSecondaryAction> {chooseIcon(Task)} </ListItemSecondaryAction>
      </ListItemButton>

      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        sx={{ alignItems: 'center' }}
      >
        <Button onClick={() => navigate('/edit/' + Task.id)} size="small">
          {`${i18n.t('common.edit')}`}
        </Button>
        <Button onClick={() => DeleteTodo(Task)} size="small">
          {`${i18n.t('common.remove')}`}
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
export default TodoItem;
