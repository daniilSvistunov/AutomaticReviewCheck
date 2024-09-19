import { i18n } from '@locales';
import { Box, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4">{`${i18n.t('task.title')}`}</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 14 }} variant="body2">
        {`${i18n.t('task.task_multiple')}`}
      </Typography>
    </Box>
  );
}
