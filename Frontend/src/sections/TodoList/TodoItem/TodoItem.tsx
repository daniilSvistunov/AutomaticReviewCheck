import i18n from '@locales/i18n';
import { Task } from '@models/interfaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {
  Checkbox,
  IconButton,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { removeTask, updateTask } from '@redux/slices/list';
import { useDispatch } from '@redux/store';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface props {
  Task: Task;
  index: number;
}

function TodoItem({ Task, index }: props) {
  const [isChecked, setIsChecked] = useState(Task.Finished);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsChecked(Task.Finished);
  }, [Task.Finished]);

  function DeleteTodo(itemDelete: Task) {
    dispatch(removeTask(itemDelete));
  }

  function check() {
    const updatedTask = { ...Task, Finished: !isChecked };
    dispatch(updateTask({ index: Task.id, task: updatedTask }));
    setIsChecked(!isChecked);
  }
  function changeImportance() {
    const newImp = ((Task.importance + 1) % 3) + 1;
    const updatedTask = { ...Task, importance: newImp };
    dispatch(updateTask({ index: index, task: updatedTask }));
  }
  function chooseIcon(task: Task) {
    switch (task.importance) {
      case 1:
        return (
          <Tooltip
            title={`${i18n.t('todoList.importanceSelect.select.0', { returnObjects: true })}`}
            sx={{ justifySelf: 'center' }}
          >
            <ErrorIcon color="error" />
          </Tooltip>
        );
      case 2:
        return (
          <Tooltip
            title={`${i18n.t('todoList.importanceSelect.select.1', { returnObjects: true })}`}
            sx={{ justifyContent: 'center' }}
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
    <ListItemButton onClick={check}>
      <Checkbox onClick={check} size="large" checked={isChecked} />
      <ListItemText
        primary={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{Task.todo}</div>
            <Tooltip title={`${i18n.t('common.edit')}`}>
              <IconButton
                onClick={(event: MouseEvent) => {
                  event.stopPropagation();
                  navigate('/edit/' + index);
                }}
                size="small"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
        }
        secondary={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{Task.Date}</div>
            <Tooltip title={`${i18n.t('common.edit')}`}>
              <IconButton
                onClick={(event: MouseEvent) => {
                  event.stopPropagation();
                  navigate('/editDate/' + index);
                }}
                size="small"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
        }
        sx={{ textDecoration: isChecked ? 'line-through' : 'none' }}
      />

      <ListItemSecondaryAction>
        <IconButton
          size="large"
          onClick={(event: MouseEvent) => {
            changeImportance();
            event.stopPropagation();
          }}
        >
          {chooseIcon(Task)}
        </IconButton>
        <Tooltip title={`${i18n.t('common.remove')}`}>
          <IconButton
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              DeleteTodo(Task);
            }}
            size="large"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
}
export default TodoItem;
