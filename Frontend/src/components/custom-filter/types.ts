import { StackProps } from '@mui/system';

import { TeamIterationFilter } from '../../sections/orders/details/capacity/iteration-details/planned/utils';

// ----------------------------------------------------------------------

export type CustomFilterProps = {
  filterOptions: FilterOptions[];
  onFilterChange: (filter: TeamIterationFilter) => void;
  filterStatus: TeamIterationFilter[];
  stackProps?: StackProps;
};

export type FilterOptions = {
  label: string;
  value: TeamIterationFilter;
};
