import { Container, Stack } from '@mui/material';
import { AddTaskCard } from '@sections/add-task-card';
import { Header } from '@sections/header';
import { TaskListCard } from '@sections/task-list-card';
import { Toolbar } from '@sections/toolbar';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>ToDo Liste</title>
      </Helmet>

      <Container>
        <Stack gap={2}>
          <Header />

          <Toolbar />

          <AddTaskCard />

          <TaskListCard />
        </Stack>
      </Container>
    </>
  );
}
