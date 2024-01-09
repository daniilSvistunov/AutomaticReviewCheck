import { Box, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import cloneDeep from 'lodash/cloneDeep';

import { MenuComponentProps } from './types';

// ----------------------------------------------------------------------

const DateRangePickerMenu = <T extends object>(props: MenuComponentProps<T>) => {
  const { filterItem, saveFilter } = props;

  const updateFilter = (newDate: Date | null, start: boolean) => {
    if (newDate && isNaN(newDate.getTime())) {
      return;
    }
    const editableFilterItem = cloneDeep(filterItem);
    if (!editableFilterItem.value) {
      editableFilterItem.value = [null, null];
    }

    if (newDate !== null) {
      const indexToUpdate = start ? 0 : 1;
      (editableFilterItem.value as Date[])[indexToUpdate] = newDate;
    }

    saveFilter(editableFilterItem);
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
            label="Start date"
            value={Array.isArray(filterItem.value) ? (filterItem.value[0] as Date) : null}
            onChange={(newDate: Date | null) => {
              updateFilter(newDate, true);
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
          <Box marginX={1} />
          <DatePicker
            label="End date"
            value={Array.isArray(filterItem.value) ? (filterItem.value[1] as Date) : null}
            onChange={(newDate: Date | null) => {
              updateFilter(newDate, false);
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Box>
      </div>
    </MenuItem>
  );
};
export default DateRangePickerMenu;
