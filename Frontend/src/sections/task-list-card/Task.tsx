import Iconify from '@components/iconify';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export default function Task() {
  return (
    <ListItem
      secondaryAction={
        <IconButton>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox edge="start"></Checkbox>
        </ListItemIcon>
        <ListItemText primary={'This Header'} secondary={'This Secondary'}></ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
