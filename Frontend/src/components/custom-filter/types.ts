import { StackProps } from '@mui/system';
import i18n from 'src/locales/i18n';

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

export enum TeamIterationFilter {
  Past,
  Current,
  Upcoming,
}

export const localizeTeamIterationFilter = (filter: TeamIterationFilter) => {
  const filterText = {
    [TeamIterationFilter.Past]: i18n.t('orders.capacities.teamIterationFilter.past'),
    [TeamIterationFilter.Current]: i18n.t('orders.capacities.teamIterationFilter.current'),
    [TeamIterationFilter.Upcoming]: i18n.t('orders.capacities.teamIterationFilter.upcoming'),
  };
  
  return filterText[filter];
};