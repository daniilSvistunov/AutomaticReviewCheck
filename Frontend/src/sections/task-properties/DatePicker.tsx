import { CalendarTodayRounded, KeyboardArrowDownRounded } from '@mui/icons-material';
import { Button, Menu } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { type MouseEvent, useState } from 'react';

// ----------------------------------------------------------------------

interface Props {
  value: Date;
  setValue: (date: Date) => void;
}

// ----------------------------------------------------------------------

export default function DatePicker({ value, setValue }: Readonly<Props>) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  function handleChange(value: Date) {
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
        startIcon={<CalendarTodayRounded />}
        variant="outlined"
      >
        {format(value, 'dd.MM.yy')}
      </Button>

      <Menu anchorEl={anchor} onClose={() => setAnchor(null)} open={Boolean(anchor)}>
        <DateCalendar onChange={handleChange} value={value} />
      </Menu>
    </div>
  );
}
