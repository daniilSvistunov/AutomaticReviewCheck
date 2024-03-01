import '@sections/styles/App.css';

import { MotionContainer, varBounce } from '@components/animate';
import { Container, styled, Typography } from '@mui/material';
import TaskDetails from '@sections/todo/details/TaskDetails';
import TasksProvider from '@sections/todo/provider/TasksProvider';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

// ----------------------------------------------------------------------

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 'auto',
}));

export default function TodoApp() {
  const { taskId } = useParams();

  return (
    <>
      <Helmet>
        <title>{`ToDo App`}</title>
        <link rel="icon" type="image/svg+xml" href="/assets/icons/functions/check-solid.svg" />
      </Helmet>
      <TasksProvider>
        <StyledContainer>
          <MotionContainer>
            <m.div variants={varBounce().in}>
              <TaskDetails taskId={Number(taskId)} />
            </m.div>
          </MotionContainer>
        </StyledContainer>
      </TasksProvider>
    </>
  );
}
