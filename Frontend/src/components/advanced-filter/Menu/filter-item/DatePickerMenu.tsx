import { Box, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import cloneDeep from 'lodash/cloneDeep';

import { MenuComponentProps } from './types';

// ----------------------------------------------------------------------

const DatePickerMenu = <T extends object>(props: MenuComponentProps<T>) => {
  const { filterItem, saveFilter } = props;

  const updateFilter = (newDate: Date | null) => {
    if (newDate && isNaN(newDate.getTime())) {
      return;
    }
    const editableFilter = cloneDeep(filterItem);
    editableFilter.value = newDate;
    saveFilter(editableFilter);
  };

  return (
    <MenuItem
      disableRipple
      sx={{
        backgroundColor: 'transparent !important',
      }}
    >
      <div onKeyDown={(e) => e.stopPropagation()}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <DatePicker
            label="Date"
            value={filterItem.value}
            onChange={(newDate: Date | null) => updateFilter(newDate)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Box>
      </div>
    </MenuItem>
  );
};
export default DatePickerMenu;
