import { Switch } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';

import { FlexBox, StyledMenuItem, StyledTypography } from '../IconMenuItem';
import { MenuComponentProps } from './types';

// ----------------------------------------------------------------------

const SwitchMenuItem = <T extends object>(props: MenuComponentProps<T>) => {
  const { filterItem, saveFilter } = props;

  const updateFilter = () => {
    const editableFilterItem = cloneDeep(filterItem);
    editableFilterItem.value = !editableFilterItem.value;
    saveFilter(editableFilterItem);
  };

  return (
    <StyledMenuItem
      disableRipple
      sx={{
        backgroundColor: 'transparent !important',
        py: 0,
        my: -0.5,
      }}
    >
      <FlexBox>
        <StyledTypography>{filterItem.label}</StyledTypography>
      </FlexBox>
      <Switch
        sx={{ marginLeft: 4 }}
        id="switch"
        checked={filterItem.value as boolean}
        onChange={updateFilter}
      />
    </StyledMenuItem>
  );
};
export default SwitchMenuItem;
