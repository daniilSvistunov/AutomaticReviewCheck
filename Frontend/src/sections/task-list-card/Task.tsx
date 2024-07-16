import { DeleteRounded } from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { type Task as Props, remove, toggle } from '@redux/slices/task';
import { useDispatch } from '@redux/store';

// ----------------------------------------------------------------------

export default function Task({ ID, title, checked }: Readonly<Props>) {
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
          primary={title}
          primaryTypographyProps={{ fontSize: 16, variant: 'subtitle1' }}
        />
      </ListItemButton>
    </ListItem>
  );
}
