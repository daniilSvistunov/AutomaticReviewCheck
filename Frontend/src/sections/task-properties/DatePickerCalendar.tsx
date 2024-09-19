import { i18n } from '@locales';
import { CalendarToday, CalendarTodayRounded, KeyboardArrowDownRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';

export function DatePickerCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Button
          color="inherit"
          onClick={() => setOpen(true)}
          endIcon={<KeyboardArrowDownRounded />}
          startIcon={<CalendarTodayRounded />}
          variant="outlined"
          size="small"
        >
          {selectedDate
            ? `${i18n.t('task.date', { val: selectedDate })}`
            : `${i18n.t('task.properties.due')}`}
        </Button>
        <DatePicker
          open={open}
          onOpen={() => setOpen(false)}
          onClose={() => setOpen(false)}
          label="Choose a date"
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue);
            setOpen(false);
          }}
          renderInput={({ inputRef, inputProps }) => <span ref={inputRef} {...inputProps}></span>}
        />
      </Box>
    </LocalizationProvider>
  );
}
