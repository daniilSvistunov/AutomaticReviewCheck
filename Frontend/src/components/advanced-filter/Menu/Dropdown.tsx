import Button, { ButtonProps } from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import React, { useState } from 'react';

import Iconify from '../../iconify';
import { Filter, FilterItem } from '../types';
import nestedMenuItemsFromObject from './nestedMenuItemsFromObject';

interface NestedDropdownProps<T extends object> {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ButtonProps?: Partial<ButtonProps>;
  MenuProps?: Partial<MenuProps>;
  filter: Filter<T> | null;
  saveFilter: (filterItem: FilterItem<T>) => void;
}

const DropdownMenu = <T extends object>(props: NestedDropdownProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const { saveFilter, filter, onClick, ButtonProps, MenuProps, ...rest } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    onClick?.(e);
  };

  const handleClose = () => setAnchorEl(null);

  let menuItems = null;
  if (filter) {
    menuItems = nestedMenuItemsFromObject({
      handleClose,
      isOpen: open,
      filter: filter,
      saveFilter: saveFilter,
    });
  }

  return (
    <div {...rest}>
      <Button
        onClick={handleClick}
        endIcon={<Iconify icon="ic:round-chevron-down" sx={{ color: 'text.disabled' }} />}
        {...ButtonProps}
      >
        {'Filter'}
      </Button>
      {filter && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} {...MenuProps}>
          {filter ? menuItems : null}
        </Menu>
      )}
    </div>
  );
};

export default DropdownMenu;
