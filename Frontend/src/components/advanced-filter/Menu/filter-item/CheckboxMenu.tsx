import { Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';

import { MenuComponentProps } from './types';

// ----------------------------------------------------------------------

const CheckboxMenu = <T extends object>(props: MenuComponentProps<T>) => {
  const { filterItem, saveFilter } = props;

  const updateFilter = (event: { target: { checked: boolean } }, checkboxOption: string) => {
    const editableFilterItem = cloneDeep(filterItem);

    if (editableFilterItem.options) {
      const optionIndex = editableFilterItem.options.findIndex((opt) => opt === checkboxOption);

      if (optionIndex !== -1) {
        if (editableFilterItem.value) {
          (editableFilterItem.value as boolean[])[optionIndex] = event.target.checked;
        } else {
          editableFilterItem.value = new Array(editableFilterItem.options.length).fill(false);
          (editableFilterItem.value as boolean[])[optionIndex] = event.target.checked;
        }
      }

      if ((editableFilterItem.value as boolean[]).every((val) => !val)) {
        editableFilterItem.value = null;
      }
    }

    saveFilter(editableFilterItem);
  };

  return (
    <>
      {filterItem.options?.map((option, index) => (
        <MenuItem
          disableRipple
          sx={{
            backgroundColor: 'transparent !important',
            py: 0,
          }}
          key={option as string}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={(filterItem.value as boolean[])?.[index] ?? false}
                onChange={(event) => updateFilter(event, option as string)}
              />
            }
            label={filterItem.optionsLabel?.[index] ?? option}
            key={option as string}
          />
        </MenuItem>
      ))}
    </>
  );
};
export default CheckboxMenu;
