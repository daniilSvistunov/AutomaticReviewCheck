import { KeyboardArrowDownRounded, NotificationsRounded } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { type Duration, formatDuration } from 'date-fns';
import { type MouseEvent, useState } from 'react';

// ----------------------------------------------------------------------

interface Props {
  value?: Duration;
  setValue: (duration: Duration) => void;
}

// ----------------------------------------------------------------------

const list: Duration[] = [
  { minutes: 5 },
  { minutes: 15 },
  { minutes: 30 },
  { hours: 1 },
  { days: 1 },
];

export default function TaskDetailReminder({ value, setValue }: Readonly<Props>) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  function handleClick(value: Duration) {
    setValue(value);

    setAnchor(null);
  }

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
        {value ? formatDuration(value) : 'Erinnerung'}
      </Button>

      <Menu anchorEl={anchor} onClose={() => setAnchor(null)} open={Boolean(anchor)}>
        {list.map((item) => (
          <MenuItem key={formatDuration(item)} onClick={() => handleClick(item)}>
            {formatDuration(item)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
