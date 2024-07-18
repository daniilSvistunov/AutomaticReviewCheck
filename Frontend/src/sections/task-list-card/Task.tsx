import { DeleteRounded } from '@mui/icons-material';
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

import TaskPropertiesSizes from './TaskPropertiesSizes';

// ----------------------------------------------------------------------

export default function Task({ ID, title, checked, ...properties }: Readonly<Props>) {
  const dispatch = useDispatch();

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton color="error" edge="end" onClick={() => dispatch(remove(ID))}>
          <DeleteRounded />
        </IconButton>
      }
      sx={{
        '& .MuiListItemSecondaryAction-root': { visibility: 'hidden' },
        '&:hover .MuiListItemSecondaryAction-root': { visibility: 'visible' },
      }}
    >
      <ListItemButton dense onClick={() => dispatch(toggle(ID))} sx={{ borderRadius: 1 }}>
        <ListItemIcon>
          <Checkbox checked={checked} disableRipple edge="start" />
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
    </ListItem>
  );
}
