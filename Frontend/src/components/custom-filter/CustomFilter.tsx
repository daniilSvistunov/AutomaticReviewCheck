import { Button, Checkbox, FormControlLabel, MenuItem, Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import { useLocales } from '../../locales';
import Iconify from '../iconify';
import MenuPopover from '../menu-popover';
import {
  localizeTeamIterationFilter,
  TeamIterationFilter,
} from './types';
import { CustomFilterProps } from './types';

// ----------------------------------------------------------------------

export default function CustomFilter({
  filterOptions,
  onFilterChange,
  stackProps,
  filterStatus,
}: CustomFilterProps) {
  const { translate } = useLocales();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const showAll = filterStatus.length === filterOptions.length || isEmpty(filterStatus);

  const translateFilterOptions = (options: TeamIterationFilter[]) => {
    const translatedOptions: string[] = [];
    options.forEach((option) => {
      translatedOptions.push(localizeTeamIterationFilter(option));
    });

    return translatedOptions;
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  return (
    <Stack {...stackProps}>
      <Button
        disableRipple
        style={{ backgroundColor: 'transparent' }}
        endIcon={<Iconify icon={'mdi:filter-variant'} />}
        onClick={handleOpenPopover}
      >
        {showAll
          ? `${translate('all')}`
          : translateFilterOptions(filterStatus).slice(0, 2).join(', ')}
      </Button>
      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ p: 0 }}>
        {filterOptions.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{ backgroundColor: 'transparent' }}
            sx={{
              p: 0,
              m: 1,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  size="small"
                  onClick={() => onFilterChange(option.value)}
                  checked={filterStatus.includes(option.value)}
                />
              }
              label={option.label}
            />
          </MenuItem>
        ))}
      </MenuPopover>
    </Stack>
  );
}
