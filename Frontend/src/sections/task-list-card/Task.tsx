import Iconify from '@components/iconify';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { type Task as Props, remove, toggle } from '@redux/slices/task';
import { useDispatch } from '@redux/store';
import { TaskEditCard } from '@sections/task-edit-card';
import { omit, pick } from 'lodash';
import { type MouseEvent, useRef, useState } from 'react';

import TaskPropertiesSizes from './TaskPropertiesSizes';

// ----------------------------------------------------------------------

export default function Task(props: Readonly<Props>) {
  const { id, title, checked } = props;

  const properties = pick(props, ['due', 'reminder', 'priority', 'bucket', 'team', 'assignee']);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const icon = useRef<HTMLDivElement | null>(null);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (icon.current !== null && !icon.current.contains(event.target as HTMLElement)) {
      setOpen(true);
    }
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton color="error" edge="end" onClick={() => dispatch(remove(id))}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      }
      sx={{
        '& .MuiListItemSecondaryAction-root': { visibility: 'hidden' },
        '&:hover .MuiListItemSecondaryAction-root': { visibility: 'visible' },
      }}
    >
      <ListItemButton dense onClick={handleClick} sx={{ borderRadius: 1 }}>
        <ListItemIcon ref={icon}>
          <Checkbox
            checked={checked}
            disableRipple
            edge="start"
            onChange={() => dispatch(toggle(id))}
          />
        </ListItemIcon>

        <ListItemText
          disableTypography
          primary={
            <Typography sx={{ fontSize: 16 }} variant="subtitle1">
              {title}
            </Typography>
          }
          secondary={<TaskPropertiesSizes {...properties} />}
        />
      </ListItemButton>

      <TaskEditCard onClose={() => setOpen(false)} open={open} {...omit(props, ['checked'])} />
    </ListItem>
  );
}
