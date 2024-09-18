import { MotionContainer } from '@components/animate';
import { Container, styled, Typography } from '@mui/material';
import AddTaskCard from '@sections/todolist/AddTaskCard';
import Header from '@sections/todolist/Header';
import TaskListCard from '@sections/todolist/TaskListCard';
import ToolBar from '@sections/todolist/Toolbar';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'start',
  minHeight: '100vh',
  width: '100vh',
  margin: 'auto',
}));

export default function ToDoPage() {
  return (
    <>
      <Helmet>
        <title>{`Sample page`}</title>
      </Helmet>
      {/* <OKPlattformLayout /> */}
      <StyledContainer>
        <MotionContainer>
          <Header />
          <ToolBar
            setEmployeeToSearch={function (arg: string): void {
              throw new Error('Function not implemented.');
            }}
          />
          <AddTaskCard />
          <TaskListCard />
          {/* <DatePicker /> */}
        </MotionContainer>
      </StyledContainer>
    </>
  );
}
