import Logo from '@components/logo';
import i18n from '@locales/i18n';
import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import AddingTasks from './AddingComponent';
import Filter from './FilterComponent';

function InteractiveSection() {
  return (
    <Stack spacing={5} sx={{ margin: '1rem' }}>
      <Stack spacing={5}>
        <Logo sx={{ alignSelf: 'center' }} />
        <Typography variant={'h1'} sx={{ alignSelf: 'center' }}>
          {`${i18n.t('todoList.title')}`}
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <AddingTasks />
        <Divider variant="middle" />
        <Filter />
      </Stack>
    </Stack>
  );
}

export default InteractiveSection;
