import { i18n } from '@locales';
import { CalendarTodayRounded, KeyboardArrowDownRounded } from '@mui/icons-material';
import { Button, Menu } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { type MouseEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

export default function DatePicker() {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const { getValues } = useFormContext();

  const date = getValues('due');

  const handleChange = (onChange: (date: Date) => void) => (date: Date) => {
    onChange(date);

    setAnchor(null);
  };

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
        {date ? `${i18n.t('task.date', { val: date })}` : `${i18n.t('task.properties.due')}`}
      </Button>

      <Menu anchorEl={anchor} onClose={() => setAnchor(null)} open={Boolean(anchor)}>
        <Controller
          name="due"
          render={({ field: { onChange, value } }) => (
            <DateCalendar onChange={handleChange(onChange)} value={value ?? null} />
          )}
        />
      </Menu>
    </div>
  );
}
