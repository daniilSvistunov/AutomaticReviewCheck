import { MotionContainer, varBounce } from '@components/animate';
import { useLocales } from '@locales';
import { Container, styled, Typography } from '@mui/material';
import TaskDetail from '@sections/tasks/task-detail';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

// ----------------------------------------------------------------------

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 'auto',
}));

export default function TasksPage() {
  const params = useParams();
  const { translate } = useLocales();
  // const taskId = Number(params.taskId);

  return (
    <>
      <Helmet>{`${translate('tasks.detail.title')}`}</Helmet>

      <StyledContainer>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h2" paragraph>
              {`${translate('tasks.detail.title')}`}
            </Typography>
            <TaskDetail taskId={params.taskId} />
          </m.div>
        </MotionContainer>
      </StyledContainer>
    </>
  );
}
