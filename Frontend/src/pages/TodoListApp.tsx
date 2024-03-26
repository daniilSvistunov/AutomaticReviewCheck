import { useSettingsContext } from '@components/settings';
import { Paper, Switch } from '@mui/material';
import { Stack } from '@mui/system';
import { Outlet } from 'react-router';

import InteractiveSection from '../sections/TodoList/InteractiveSectionComponenet';
import TodoListSection from '../sections/TodoList/TodoListSection';

function App() {
  const { onToggleMode } = useSettingsContext();
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <Outlet />

      <Stack direction={'row'} sx={{ justifyContent: 'center' }}>
        <Stack spacing={'5%'} sx={{ maxHeight: '200px' }}>
          <Switch onChange={onToggleMode} />

          <Paper elevation={16}>
            <InteractiveSection />
            <TodoListSection />
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
//<InputPopup isEdited={editTodo} id={editIndex}showPopup={isEdited} oldValue={editValue} newValue={setEditValue} cancel={() => {setEditValue("");setIsEdited(!isEdited)}}/>

export default App;
