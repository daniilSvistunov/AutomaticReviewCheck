import ConfirmDialog from '@components/confirm-dialog/ConfirmDialog';
import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { Task } from '@models/task';
import { Button, List } from '@mui/material';
import { useContext, useState } from 'react';

import i18n from '../../../locales/i18n';
import TaskItem from '../task/TaskItem';

const TaskList = ({ removeTask }: { removeTask: (selectedTaskId: string | undefined) => void }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const { tasks } = useContext(TasksContext);

  const currentTask: Task | undefined = tasks.find((task: Task) => task.id === selectedTaskId);

  const handleConfirm = () => {
    // Handle the confirm action here
    setIsDialogOpen(false);
    removeTask(selectedTaskId);
  };

  const handleCancel = () => {
    // Handle the cancel action here
    setIsDialogOpen(false);
  };

  const removeTaskChildComponent = (clickedTaskId: string | undefined) => {
    setIsDialogOpen(true);
    setSelectedTaskId(clickedTaskId);
  };

  return (
    <List id="myTasks" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <ConfirmDialog
        titleComponent={`${i18n.t('tasks.deleteTask')}`}
        contentComponent={`${i18n.t('tasks.confirmDeleteTask', {
          taskTitle: currentTask?.title ?? '',
        })}`}
        actionComponent={
          <Button variant="contained" color="error" onClick={handleConfirm}>
            {`${i18n.t('common.remove')}`}
          </Button>
        }
        open={isDialogOpen}
        onClose={handleCancel}
      />
      {tasks.map((task: Task) => (
        <TaskItem taskId={task.id} handleOpenDialog={removeTaskChildComponent} key={task.id} />
      ))}
    </List>
  );
};

export default TaskList;
