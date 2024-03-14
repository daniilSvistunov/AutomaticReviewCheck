import { MotionContainer, varBounce } from '@components/animate';
import IconToggleButton from '@components/icon-toggle-button';
import useLocalStorage from '@hooks/useLocalStorage';
import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Button, Container, styled, Typography } from '@mui/material';
import {
  removeSelectedTaskByID /* , saveSettings */,
  tasksSort,
  themeChange,
} from '@redux/slices/tasks';
import { useDispatch } from '@redux/store';
import TaskInputForm from '@sections/tasks/task-input-form/TaskInputForm';
import TaskList from '@sections/tasks/task-list';
import { m } from 'framer-motion';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import i18n from '../../locales/i18n';

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
  const { tasks, /* sortTasks, */ theme } = useContext(TasksContext);
  const dispatch = useDispatch();
  const [settings, setSettings] = useLocalStorage<string | null>('settings', null);
  const [isToggled, setIsToggled] = useState<boolean>(
    settings && settings.themeMode === 'dark' ? true : false
  );
  const { themeMode, ...rest } = theme;

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

  // Function that sorts a list alphabeticall
  const sortList = () => {
    dispatch(tasksSort(tasks));
    // sortTasks();
  };

  // TODO: outsource logic to redux folder
  // Function that toggles the theme
  const handleThemeToggle = (isToggledChildComponent: boolean) => {
    setIsToggled(isToggledChildComponent);
    dispatch(themeChange(isToggled));
    // dispatch(saveSettings(isToggled));

    const newTheme = {
      themeMode: isToggled ? 'light' : 'dark',
      ...rest,
    };
    setSettings(newTheme);
    window.location.reload(); // TODO: improve this line by using a better solution for changing themeMode without reloading the page
  };

  const title = i18n.t('tasks.title');
  const overviewTitle = i18n.t('tasks.overview.title');
  const overviewSubTitle = i18n.t('tasks.overview.subTitle');
  const buttonSort = i18n.t('tasks.button.sort');

  return (
    <>
      <Helmet>{title}</Helmet>

      <StyledContainer>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h2" paragraph>
              {overviewTitle}
            </Typography>
            <Typography variant="h4" paragraph>
              {overviewSubTitle}
            </Typography>
            <IconToggleButton
              initialToggleState={isToggled}
              changeToggleState={handleThemeToggle}
              IconComponent={{ initialIcon: Brightness6Icon, secondIcon: LightModeIcon }}
            />
            <Button onClick={sortList}>{buttonSort}</Button>
            <TaskList removeTask={removeTask} />
            <TaskInputForm />
          </m.div>
        </MotionContainer>
      </StyledContainer>
    </>
  );
}
