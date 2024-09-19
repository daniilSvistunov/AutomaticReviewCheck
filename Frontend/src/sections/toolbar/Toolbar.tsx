import { Stack } from '@mui/system';
import { useState } from 'react';

import {
  ButtonGroupDate,
  FilterButton,
  StyledFilterStack,
  StyledToolbarBox,
  StyledToolbarStack,
} from '../todolist/styles';
import ToolbarGlobalSearch from '../todolist/ToolbarGlobalSearch';
import DateButtonGroup from './DateButtonGroup';

type Props = {
  setEmployeeToSearch: (arg: string) => void;
};

export default function ToolBar({ setEmployeeToSearch }: Props) {
  return (
    <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Stack direction={'row'} spacing={2} alignItems="center">
        <ToolbarGlobalSearch />
      </Stack>
      <DateButtonGroup />
    </Stack>
  );
}
