import { Stack } from '@mui/material';
import _, { isObject } from 'lodash';

import ChipBar from './Chipbar';
import DropdownMenu from './Menu/Dropdown';
import {
  AdvancedFilterProps,
  Filter,
  FilterItemOption,
  FilterItemType,
} from './types';
import { containsOnlyNull } from './utils';

// ----------------------------------------------------------------------

export type Storage = Record<string, string | string[] | null>;

// ----------------------------------------------------------------------

export const applyAdvancedFilter = <T extends object>(data: T[], filter: Filter<T>): T[] => {
  if (!filter) {
    return data;
  }
  return filter.reduce((filteredData, filterItem) => {
    const { value, type, options } = filterItem;

    if (value === null || value === '') {
      return filteredData;
    }

    const valueArray: FilterItemOption[] = [];

    if (Array.isArray(value)) {
      if (value.length === 0 || containsOnlyNull(value)) {
        return filteredData;
      }
      if (type === 'checkbox' && options) {
        for (let index = 0; index < value.length; index++) {
          if (value[index] && filterItem.options) {
            valueArray.push(filterItem.options[index]);
          }
        }
      }
    }

    return filteredData.filter((dataItem) => {
      const dataValues = Array.isArray(filterItem.key)
        ? filterItem.key.map((key) => extractArray(dataItem, key)).flat()
        : [extractArray(dataItem, filterItem.key)].flat();

      return dataValues.some((dataValue) => {
        if (isObject(dataValue)) {
          const objectValues = Array.isArray(filterItem.key)
            ? filterItem.key.map((key) => _.get(dataValue, getPartAfterNumber(key))).flat()
            : [_.get(dataValue, getPartAfterNumber(filterItem.key))].flat();

          return objectValues.some((objectValue) => {
            if (valueArray.length > 0) {
              return valueArray.some((valueFromArray) => {
                return compareDataValue(objectValue, valueFromArray, filterItem.type);
              });
            } else {
              return compareDataValue(objectValue, value, filterItem.type);
            }
          });
        }

        if (valueArray.length > 0) {
          return valueArray.some((valueFromArray) => {
            return compareDataValue(dataValue, valueFromArray, filterItem.type);
          });
        } else {
          return compareDataValue(dataValue, value, filterItem.type);
        }
      });
    });
  }, data);
};

const extractArray = <T extends object>(dataItem: T, key: string) => {
  const regex = /^(.*?)(?=\d)/;
  const matches = regex.exec(key);

  if (matches && matches.length > 0) {
    let extractedKey = matches[1];

    if (extractedKey.endsWith('.')) {
      extractedKey = extractedKey.slice(0, -1);
    }
    return _.get(dataItem, extractedKey);
  }

  return _.get(dataItem, key);
};

const getPartAfterNumber = (key: string) => {
  const regex = /\d+\.(.+)/;
  const match = regex.exec(key);

  if (match && match.length > 1) {
    return match[1];
  }

  return '';
};

const compareDataValue = (dataValue: unknown, value: unknown, filterType: FilterItemType) => {
  if (filterType === 'number' && typeof dataValue === 'number') {
    return dataValue === Number(value);
  }

  if (filterType === 'number-range' && typeof dataValue === 'number') {
    const [min, max] = value as [number, number];
    return dataValue >= min && dataValue <= max;
  }

  if (filterType === 'date-range' && dataValue) {
    const [min, max] = value as [Date, Date];
    const date = new Date(dataValue as Date);
    return date >= min && date <= max;
  }

  if (typeof value === 'string' && typeof dataValue === 'string') {
    return dataValue.toLowerCase().includes(value.toLowerCase());
  }

  if (typeof value === 'boolean' && typeof dataValue === 'boolean') {
    if (value === false) {
      return true;
    }
    return dataValue === value;
  }

  if (filterType === 'checkbox' && typeof value === 'number') {
    return dataValue === value;
  }

  return false;
};

// ----------------------------------------------------------------------

const AdvancedFilter = <T extends object>({ filter, saveFilter }: AdvancedFilterProps<T>) => {
  if (!filter) {
    return null;
  }

  return (
    <Stack direction="row" sx={{ m: 1, alignItems: 'center' }}>
      <DropdownMenu filter={filter} MenuProps={{ elevation: 3 }} saveFilter={saveFilter} />
      <ChipBar saveFilter={saveFilter} filter={filter} />
    </Stack>
  );
};
export default AdvancedFilter;
