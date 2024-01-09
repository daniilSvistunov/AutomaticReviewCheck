import { Box, MenuItem, TextField } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';

import { MenuComponentProps } from './types';

// ----------------------------------------------------------------------

const NumberMenu = <T extends object>(props: MenuComponentProps<T>) => {
  const { filterItem, saveFilter } = props;

  const updateFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const editableFilterItem = cloneDeep(filterItem);

    editableFilterItem.value = newValue;
    saveFilter(editableFilterItem);
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
          label="Number"
          defaultValue={filterItem.value as number}
          size="small"
          onChange={(event) => updateFilter(event)}
          type="number"
        />
      </Box>
    </MenuItem>
  );
};

export default NumberMenu;
