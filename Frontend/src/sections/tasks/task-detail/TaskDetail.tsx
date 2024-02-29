import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useContext } from 'react';

import EditDialog from './EditDialog';

function TaskDetail({ taskId }: { taskId: string | undefined }) {
  const { tasks } = useContext(TasksContext);

  const selectedTask = tasks.find((task) => task.id === String(taskId));

  // Stacks verwenden

  return (
    <Card variant="elevation">
      {selectedTask ? (
        <CardContent sx={{ height: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {selectedTask.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {`${selectedTask.description ? selectedTask?.description : 'Placeholder'}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {`${selectedTask.id}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <EditDialog selectedTaskId={selectedTask.id} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      ) : null}
    </Card>
  );
}

export default TaskDetail;
