import { Add, FilterAlt } from '@mui/icons-material';
import { Container, IconButton, styled } from '@mui/material';
import TodoAddModal from '@sections/todo/app/TodoAddModal';
import TodoFilterModal from '@sections/todo/app/TodoFilterModal';
import TodoTable from '@sections/todo/app/TodoTable';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 'auto',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  maxWidth: '100%!important',
  padding: '0!important',
}));

const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  bottom: '10px',
  color: 'white',
  transition: 'all 300ms ease-in-out',
}));

export default function TodoApp() {
  const [openTodoAddModal, setOpenTodoAddModal] = useState<boolean>(false);
  const [openTodoFilterModal, setOpenTodoFilterModal] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>{`ToDo App`}</title>
        <link rel="icon" type="image/svg+xml" href="/assets/icons/functions/check-solid.svg" />
      </Helmet>

      <StyledContainer>
        <TodoFilterModal open={openTodoFilterModal} onClose={() => setOpenTodoFilterModal(false)} />
        <TodoAddModal open={openTodoAddModal} onClose={() => setOpenTodoAddModal(false)} />
        <TodoTable />
        <StyledIconButton
          size="large"
          sx={{
            left: '15px',
            backgroundColor: '#1e90ff',
            '&:hover': { backgroundColor: '#4169e1' },
          }}
          onClick={() => setOpenTodoFilterModal(true)}
        >
          <FilterAlt sx={{ fontSize: '2.5rem' }} />
        </StyledIconButton>
        <StyledIconButton
          size="large"
          sx={{
            right: '15px',
            backgroundColor: '#00aa00',
            '&:hover': { backgroundColor: '#009b00' },
          }}
          onClick={() => setOpenTodoAddModal(true)}
        >
          <Add sx={{ fontSize: '2.5rem' }} />
        </StyledIconButton>
      </StyledContainer>
    </>
  );
}
