import '@sections/styles/App.css';

import { MotionContainer, varBounce } from '@components/animate';
import { Container, styled, Typography } from '@mui/material';
import TodoAddBar from '@sections/todo/app/TodoAddBar';
import TodoTable from '@sections/todo/app/TodoTable';
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
        <link rel="icon" type="image/svg+xml" href="/assets/icons/functions/check-solid.svg" />
      </Helmet>

      <div className="container">
        <TodoTable />
        <TodoAddBar />
      </div>
    </>
  );
}
