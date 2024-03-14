import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { Task } from '@models/task';
import ArticleIcon from '@mui/icons-material/Article';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useContext, useState } from 'react';

import EditDialog from './EditDialog';

function TaskDetail({ taskId }: { taskId: string | undefined }) {
  const [open, setIsOpen] = useState<boolean>(false);
  const { tasks } = useContext(TasksContext);

  const selectedTask: Task | undefined = tasks.find((task) => task.id === String(taskId));

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip title="Details">
        <IconButton onClick={handleClickOpen}>
          <ArticleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose}>
        {selectedTask ? (
          <>
            <DialogTitle>{selectedTask.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {`${selectedTask.description ? selectedTask.description : 'Placeholder'}`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <EditDialog selectedTaskId={selectedTask.id} />
            </DialogActions>
          </>
        ) : null}
      </Dialog>
    </>
  );
}

export default TaskDetail;
