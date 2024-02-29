import '@sections/App.css';

import { MotionContainer, varBounce } from '@components/animate';
import { Container, styled, Typography } from '@mui/material';
import TasksProvider from '@sections/TasksProvider';
import TodoAddBar from '@sections/TodoAddBar';
import TodoTable from '@sections/TodoTable';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

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
  return (
    <>
      <Helmet>
        <title>{`ToDo App`}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/icons/setting/ic_exit_full_screen.svg"
        />
      </Helmet>

      <TasksProvider>
        <div className="container">
          <TodoTable />
          <TodoAddBar />
        </div>
      </TasksProvider>
    </>
  );
}
