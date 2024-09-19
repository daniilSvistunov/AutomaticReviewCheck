import {
  Bookmark,
  Group,
  KeyboardArrowDownRounded,
  Notifications,
  Person,
  PriorityHigh,
} from '@mui/icons-material';
import { Button, Popover, Stack, Typography } from '@mui/material';
import FilterValueMenu from '@sections/todolist/FilterValueMenu';
import { useState } from 'react';

import { DatePickerCalendar } from './DatePickerCalendar';

export default function FilterChips() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Stack direction={'row'} spacing={2}>
      <DatePickerCalendar></DatePickerCalendar>
      {[
        { icon: <Notifications />, label: 'Erinnerung' },
        { icon: <PriorityHigh />, label: 'Priorität' },
        { icon: <Bookmark />, label: 'Bucket' },
        { icon: <Group />, label: 'Termin' },
        { icon: <Person />, label: 'Zuweisen an' },
      ].map(({ icon, label }) => (
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          key={label}
          onClick={handleFilter}
          endIcon={<KeyboardArrowDownRounded />}
        >
          {icon}
          <Typography>{label}</Typography>
        </Button>
      ))}
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FilterValueMenu />
      </Popover>
    </Stack>
  );
}
