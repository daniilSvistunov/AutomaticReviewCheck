import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { useLocales } from '@locales';
import { Task } from '@models/task';
import { useContext, useState } from 'react';

import TaskItem from '../task/TaskItem';
import CustomDialog from './CustomConfirmDialog';

const TaskList = ({
  removeTask,
  editTask,
}: {
  removeTask: (selectedTaskId: string | undefined) => void;
  editTask: (selectedTaskId: string) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const { translate } = useLocales();
  const { tasks } = useContext(TasksContext);

  const handleConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle the confirm action here
    setIsDialogOpen(false);
    event.target.innerHTML === 'Yes' && removeTask(selectedTaskId);
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
    <ul id="myTasks" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <CustomDialog
        isOpen={isDialogOpen}
        title={`${translate('tasks.deleteTask')}`}
        message={`${translate('tasks.confirmDeleteTask', {
          taskTitle: selectedTaskId ?? '',
        })}`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {tasks.map((task: Task) => (
        <TaskItem
          taskId={task.id}
          handleOpenDialog={removeTaskChildComponent}
          handleEditTask={editTask}
          key={task.id}
        />
      ))}
    </ul>
  );
};

export default TaskList;
