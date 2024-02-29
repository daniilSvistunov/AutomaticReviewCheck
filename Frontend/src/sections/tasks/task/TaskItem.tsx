import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { Task } from '@models/task';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ListItem, Stack } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskItem({
  taskId,
  handleOpenDialog,
  handleEditTask,
}: {
  taskId: string;
  handleOpenDialog: (selectedTask: string | undefined) => void;
  handleEditTask: (selectedTask: string) => void;
}) {
  const navigate = useNavigate();
  const { tasks } = useContext(TasksContext);

  const currentTask: Task | undefined = tasks.find((task: Task) => task.id === taskId);

  const handleOpenDialogButtonClick = () => {
    handleOpenDialog(taskId);
  };

  const handleEditButtonClick = () => {
    handleEditTask(taskId);
  };

  return (
    <Stack
      style={{
        margin: '1px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
      }}
    >
      {/* TODO: use better HTML-Element for displaying task object -> Maybe not necessary cause of TaskDetailPage */}
      {/* TODO: There is a better approach by using a modal */}
      {currentTask ? (
        <>
          <ListItem>
            <Button variant="soft" color="error" onClick={handleOpenDialogButtonClick}>
              <DeleteIcon />
            </Button>
            {currentTask.title}
          </ListItem>
          <Button variant="outlined" onClick={() => navigate(`/tasks/${taskId}`)} type="button">
            Details
          </Button>
        </>
      ) : null}
    </Stack>
  );
}

export default TaskItem;
