import { SxProps } from '@mui/system';

import { Path } from '../../types/path';

export type Filter<T extends object> = FilterItem<T>[];

export type FilterItem<T> = {
  label: string;
  key: FilterItemPath<T> | FilterItemPath<T>[];
  type: FilterItemType;
  value: FilterValue;
  unit?: 'currency' | 'percentage' | 'number';
  placeholder?: string;
  options?: FilterItemOption[];
  optionsLabel?: string[];
};

export type FilterItemOption = string | number;

export type FilterValue =
  | string
  | string[]
  | Date
  | Date[]
  | number
  | number[]
  | boolean
  | boolean[]
  | null
  | null[];

export type FilterItemPath<T> = Path<T>;

export type FilterItemType =
  | 'switch'
  | 'text'
  // Current restriction: No support for dynamic types
  | 'checkbox'
  // | 'radio'
  // | 'user'
  | 'date'
  | 'date-range'
  | 'number'
  | 'number-range';

export interface MenuItemData<T extends object> {
  uid?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  callback?: (event: React.MouseEvent<HTMLElement>, filterItem: FilterItem<T>) => void;
  disabled?: boolean;
  sx?: SxProps;
  filter: Filter<T>;
}

export function isFilterItem<T extends object>(item: unknown): item is FilterItem<T> {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as FilterItem<T>).label === 'string' &&
    (typeof (item as FilterItem<T>).key === 'string' ||
      (Array.isArray((item as FilterItem<T>).key) &&
        ((item as FilterItem<T>).key as Path<T>[]).every((k: string) => typeof k === 'string'))) &&
    typeof (item as FilterItem<T>).type === 'string' &&
    typeof (item as FilterItem<T>).value !== 'undefined'
  );
}

export type AdvancedFilterProps<T extends object> = {
  filter: Filter<T> | null;
  saveFilter: (filter: Filter<T> | FilterItem<T>) => void;
};
