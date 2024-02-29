import { MotionContainer, varBounce } from '@components/animate';
import IconToggleButton from '@components/icon-toggle-button';
import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { useLocales } from '@locales';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Button, Container, styled, Typography } from '@mui/material';
import { removeSelectedTaskByID, tasksSort } from '@redux/slices/tasks';
import { useDispatch } from '@redux/store';
import TaskInputForm from '@sections/tasks/task-input-form/TaskInputForm';
import TaskList from '@sections/tasks/task-list';
import { m } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
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

export default function TasksPage() {
  const { tasks, sortTasks } = useContext(TasksContext);
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState<boolean>(false);

  // Function that removes a task
  const removeTask = async (selectedTaskId: string | undefined) => {
    // removes the selected Task (after confirmation) and replaces task list with new task list
    if (!selectedTaskId) {
      return;
    }
    try {
      await dispatch(removeSelectedTaskByID(selectedTaskId));
    } catch (error) {
      // TODO: SnackBar-Fehlermeldung werfen
      console.log(error);
    }
  };

  // Function that edits a task
  const editTask = (selectedTaskId: string) => {
    console.log('Clicked to edit');
    // Here the implementation for editing a clicked task
  };

  // Function that sorts a list alphabeticall
  const sortList = () => {
    dispatch(tasksSort(tasks));
    // sortTasks();
  };

  // TODO: TBC
  useEffect(() => {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setIsToggled(parsedSettings.themeMode === 'dark');
    }
  }, [isToggled]);

  return (
    <>
      <Helmet>{`${translate('tasks.title')}`}</Helmet>

      <StyledContainer>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h2" paragraph>
              {`${translate('tasks.overview.title')}`}
            </Typography>
            <Typography variant="h4" paragraph>
              {`${translate('tasks.overview.subTitle')}`}
            </Typography>
            {/*  */}
            <IconToggleButton
              // initialToggleState={true}
              IconComponent={{ initialIcon: Brightness6Icon, secondIcon: LightModeIcon }}
              // IconComponent={{ Brightness6Icon, LightModeIcon }}
              // IconComponent={ Brightness6Icon}
            />
            <Button onClick={sortList}>{`${translate('tasks.sortTasks')}`}</Button>
            <TaskList removeTask={removeTask} editTask={editTask} />
            <TaskInputForm />
          </m.div>
        </MotionContainer>
      </StyledContainer>
    </>
  );
}
