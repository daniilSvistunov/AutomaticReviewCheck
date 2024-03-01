import { Typography } from '@mui/material';
import { PATH_PAGE } from '@routes/paths';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router';

import { useTasks } from '../provider/tasksProviderFunctions';

type Props = {
  taskId: number;
};

export default function TaskDetails({ taskId }: Readonly<Props>) {
  const tasks = useTasks();
  const currentTask = tasks?.find((task) => task.id === Number(taskId));
  const navigate = useNavigate();

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return <span>keine Zeit mehr</span>;
    } else {
      return (
        <span>
          {days > 0 ? `${days} Tage` : ''} {hours > 0 ? `${hours} Stunden` : ''}{' '}
          {minutes > 0 ? `${minutes} Minuten und ` : ''}
          {seconds > 0 ? `${seconds} Sekunden` : ''}
        </span>
      );
    }
  };

  //TODO: Aufbau provisorisch. Mit MaterialUI verbessern
  return currentTask ? (
    <>
      {!currentTask.state && (
        <Typography variant="h3">
          Du hast <Countdown date={currentTask.date} renderer={renderer} /> um
        </Typography>
      )}
      <Typography variant="h3">{`"${currentTask?.task}"`}</Typography>
      {currentTask.state && <Typography variant="h3">ist abgeschlossen</Typography>}
      {!currentTask.state && <Typography variant="h3">abzuschließen</Typography>}

      <button onClick={() => navigate(PATH_PAGE.todo.root)}>Zurück zur ToDo Liste</button>
    </>
  ) : (
    <div>
      <Typography variant="h3" paragraph>
        Diese Task existiert nicht
      </Typography>
      <button onClick={() => navigate(PATH_PAGE.todo.root)}>Zurück zur ToDo Liste</button>
    </div>
  );
}
