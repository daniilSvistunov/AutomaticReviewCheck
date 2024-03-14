import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { Task } from '@models/task';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, ListItem, Stack, useTheme } from '@mui/material';
import { useContext } from 'react';

import TaskDetail from '../task-detail';

function TaskItem({
  taskId,
  handleOpenDialog,
}: Readonly<{
  taskId: string;
  handleOpenDialog: (selectedTask: string | undefined) => void;
}>) {
  const { tasks } = useContext(TasksContext);
  const theme = useTheme();

  const currentTask: Task | undefined = tasks.find((task: Task) => task.id === taskId);

  const handleOpenDialogButtonClick = () => {
    handleOpenDialog(taskId);
  };

  return (
    <Stack
      style={{
        margin: '1px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {currentTask ? (
        <>
          <TaskDetail taskId={currentTask.id} />
          <ListItem>{currentTask.title}</ListItem>
          <IconButton onClick={handleOpenDialogButtonClick}>
            <DeleteIcon sx={{ color: theme.palette.error.main }} fontSize="small" />
          </IconButton>
        </>
      ) : null}
    </Stack>
  );
}

export default TaskItem;
