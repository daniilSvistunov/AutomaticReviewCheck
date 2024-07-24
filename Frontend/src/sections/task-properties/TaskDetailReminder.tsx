import { i18n } from '@locales';
import { KeyboardArrowDownRounded, NotificationsRounded } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { formatDuration } from '@utils/formatTime';
import { type Duration } from 'date-fns';
import { type MouseEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

const list: Duration[] = [
  { minutes: 5 },
  { minutes: 15 },
  { minutes: 30 },
  { hours: 1 },
  { days: 1 },
];

export default function TaskDetailReminder() {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const { getValues } = useFormContext();

  const duration = getValues('reminder');

  const handleChange = (onChange: (duration: Duration) => void, duration: Duration) => {
    onChange(duration);

    setAnchor(null);
  };

  return (
    <div>
      <Button
        color="inherit"
        endIcon={<KeyboardArrowDownRounded />}
        onClick={(event: MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget)}
        size="small"
        startIcon={<NotificationsRounded />}
        variant="outlined"
      >
        {duration ? `${formatDuration(duration)}` : `${i18n.t('task.properties.reminder')}`}
      </Button>

      <Controller
        name="reminder"
        render={({ field: { onChange, value } }) => (
          <Menu anchorEl={anchor} onClose={() => setAnchor(null)} open={Boolean(anchor)}>
            {list.map((item) => (
              <MenuItem
                key={formatDuration(item)}
                onClick={() => handleChange(onChange, item)}
                selected={value ? formatDuration(item) === formatDuration(value) : false}
              >
                {formatDuration(item)}
              </MenuItem>
            ))}
          </Menu>
        )}
      />
    </div>
  );
}
