import { Container, styled } from '@mui/material';
import { PATH_PAGE } from '@routes/paths';
import TaskDetails from '@sections/todo/details/TaskDetails';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router';

// ----------------------------------------------------------------------

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 'auto',
}));

export default function TodoDetails() {
  const { taskId } = useParams();
  return (
    <>
      <Helmet>
        <title>{`ToDo App`}</title>
        <link rel="icon" type="image/svg+xml" href="/assets/icons/functions/check-solid.svg" />
      </Helmet>
      <StyledContainer>
        {taskId ? <TaskDetails taskId={taskId} /> : <Navigate to={PATH_PAGE.todo.root} />}
      </StyledContainer>
    </>
  );
}
