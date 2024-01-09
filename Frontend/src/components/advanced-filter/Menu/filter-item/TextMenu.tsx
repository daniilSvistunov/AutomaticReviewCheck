import { Box, MenuItem, TextField } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';

import { MenuComponentProps } from './types';

// ----------------------------------------------------------------------

const TextMenu = <T extends object>(props: MenuComponentProps<T>) => {
  const { filterItem, saveFilter, handleClose } = props;

  const updateFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedFilterItem = cloneDeep(filterItem);

    updatedFilterItem.value = event.target.value ? event.target.value : null;
    saveFilter(updatedFilterItem);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (handleClose) {
        handleClose();
      }
    }
    e.stopPropagation();
  };

  return (
    <MenuItem
      disableRipple
      sx={{
        backgroundColor: 'transparent !important',
      }}
    >
      <Box>
        <TextField
          label={filterItem.label}
          value={(filterItem.value as string) ?? ''}
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateFilter(event);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            handleKeyDown(event);
            event.stopPropagation();
          }}
        />
      </Box>
    </MenuItem>
  );
};

export default TextMenu;
