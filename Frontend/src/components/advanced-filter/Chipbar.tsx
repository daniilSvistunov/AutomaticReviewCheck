import { Box, Button, Chip, Stack } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';

import { useLocales } from '../../locales';
import Iconify from '../iconify';
import { Filter, FilterItem, FilterValue } from './types';
import { containsOnlyNull } from './utils';

// ----------------------------------------------------------------------

type ChipBarProps<T extends object> = {
  filter: Filter<T>;
  saveFilter: (filter: Filter<T> | FilterItem<T>) => void;
};

// ----------------------------------------------------------------------

function formatDate(date: Date) {
  const options = {
    year: 'numeric' as const,
    month: '2-digit' as const,
    day: '2-digit' as const,
  };
  return new Intl.DateTimeFormat('de-DE', options).format(date);
}

const ChipBar = <T extends object>({ filter, saveFilter }: ChipBarProps<T>) => {
  const { translate } = useLocales();

  function formatLabel(filterItem: FilterItem<T>): string {
    if (filterItem.type === 'switch') {
      return `${filterItem.label}`;
    } else if (filterItem.value instanceof Array && filterItem.value[0] instanceof Date) {
      const formattedDates = filterItem.value.map((date) => formatDate(date as Date)).join(', ');
      return `${filterItem.label}: ${formattedDates}`;
    } else if (filterItem.value instanceof Date) {
      return `${filterItem.label}: ${formatDate(filterItem.value)}`;
    } else if (filterItem.type === 'checkbox' && filterItem.options) {
      let selectedOptions = '';
      if (filterItem.optionsLabel) {
        selectedOptions = filterItem.optionsLabel
          .filter((optionLabel, index) => (filterItem.value as boolean[])[index])
          .join(', ');
      } else {
        selectedOptions = filterItem.options
          .filter((option, index) => (filterItem.value as boolean[])[index])
          .join(', ');
      }

      return `${filterItem.label}: ${selectedOptions}`;
    } else {
      return `${filterItem.label}: ${filterItem.value}`;
    }
  }

  const deselectFilterItem = (filterItem: FilterItem<T>) => {
    const editableFilterItem = cloneDeep(filterItem);
    const { type } = filterItem;
    const defaultValues: Record<string, FilterValue> = {
      checkbox: [],
      'date-range': [null, null],
      'number-range': [null, null],
      switch: false,
      text: '',
    };

    if (Object.prototype.hasOwnProperty.call(defaultValues, type)) {
      editableFilterItem.value = defaultValues[type];
      saveFilter(editableFilterItem);
    }
  };

  const deselectAll = () => {
    filter.forEach((filterItem) => {
      deselectFilterItem(filterItem);
    });
  };

  const showFilterItem = (filterItem: FilterItem<T>): boolean => {
    if (Array.isArray(filterItem.value) && containsOnlyNull(filterItem.value)) {
      return false;
    }
    if (Array.isArray(filterItem.value)) {
      return filterItem.value.length > 0;
    }
    if (filterItem.value === false) {
      return false;
    }
    return filterItem.value !== null && filterItem.value !== '';
  };

  return (
    <Stack direction="row" sx={{ alignItems: 'center' }}>
      {filter.filter((item) => showFilterItem(item)).length > 0 && (
        <Button
          color="error"
          onClick={() => deselectAll()}
          size="small"
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          {`${translate('clear')}`}
        </Button>
      )}
      <Box>
        {filter
          .filter((filterItem) => showFilterItem(filterItem))
          .map((filterItem) => (
            <Chip
              key={JSON.stringify(filterItem)}
              label={formatLabel(filterItem)}
              size="medium"
              sx={{ mx: 0.5, my: 0.5 }}
              onDelete={() => deselectFilterItem(filterItem)}
            />
          ))}
      </Box>
    </Stack>
  );
};

export default ChipBar;
