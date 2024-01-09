import {
  Button,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  MenuItem,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

import Iconify from '../iconify';
import MenuPopover from '../menu-popover';
import { CustomToolbarMoreProps } from './types';

const More = ({ items }: CustomToolbarMoreProps) => {
  const theme = useTheme();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => setOpenPopover(null);

  return (
    <>
      <Button
        size="medium"
        onClick={handleOpenPopover}
        sx={{ color: theme.palette.primary.main }}
        variant="outlined"
      >
        <Iconify icon="mdi:more-horiz" width={24} />
      </Button>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="top-left"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ p: 1, m: 1 }}
      >
        {items.map((item) => {
          if (item.props) {
            const { startIcon, ...props } = item.props;
            return (
              <MenuItem key={props.name} onClick={props.onClick}>
                <ListItemIcon sx={{ m: 0 }}>{startIcon}</ListItemIcon>
                <ListItemText {...(props as ListItemTextProps)}></ListItemText>
              </MenuItem>
            );
          }
        })}
      </MenuPopover>
    </>
  );
};

export default More;
