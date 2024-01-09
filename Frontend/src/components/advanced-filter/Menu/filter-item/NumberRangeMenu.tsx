import { Box, MenuItem, Slider } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';

import { MenuComponentProps } from './types';

const HANDLE_LEFT_EDGE = 0;

function valueNumber(value: number) {
  return `${value}`;
}

function valueLabelFormatNumber(value: number) {
  return value > 0 ? `${value}` : value;
}

// ----------------------------------------------------------------------

const NumberRangeMenu = <T extends object>(props: MenuComponentProps<T>) => {
  const { saveFilter, filterItem } = props;

  const updateFilter = (event: Event, newValues: number | number[]) => {
    if (filterItem.options) {
      const [leftValue, rightValue] = Array.isArray(newValues) ? newValues : [newValues, newValues];

      // Handle null values explicitly
      const newLeftValue = leftValue === filterItem.options[0] ? HANDLE_LEFT_EDGE : leftValue;
      const newRightValue =
        rightValue === filterItem.options[filterItem.options.length - 1] ? null : rightValue;

      // Check if both values are null, set them to the default min and max values
      const finalLeftValue = newLeftValue ?? filterItem.options[0];
      const finalRightValue = newRightValue ?? filterItem.options[filterItem.options.length - 1];

      const editableFilterItem = cloneDeep(filterItem);
      editableFilterItem.value = [finalLeftValue as number, finalRightValue as number];
      saveFilter(editableFilterItem);
    }
  };

  const marks = filterItem.options
    ? filterItem.options.map((value) => ({ value: value as number, label: `${value}` }))
    : [];

  const stepSize = filterItem.options
    ? ((filterItem.options[filterItem.options.length - 1] as number) -
        (filterItem.options[0] as number)) /
      100
    : 1;

  return (
    <MenuItem
      disableRipple
      sx={{
        backgroundColor: 'transparent !important',
      }}
    >
      <Box sx={{ width: '400px', mt: 3, mx: 1.5 }}>
        <Slider
          step={stepSize}
          marks={marks}
          min={filterItem.options ? (filterItem.options[0] as number) : 0}
          max={
            filterItem.options ? (filterItem.options[filterItem.options.length - 1] as number) : 100
          }
          value={filterItem.value as number[]}
          onChange={updateFilter}
          valueLabelDisplay="on"
          getAriaValueText={valueNumber}
          valueLabelFormat={valueLabelFormatNumber}
        />
      </Box>
    </MenuItem>
  );
};

export default NumberRangeMenu;
