import { FilterItem } from '../../types';

export type MenuComponentProps<T extends object> = {
  filterItem: FilterItem<T>;
  label?: string;
  saveFilter: (filterItem: FilterItem<T>) => void;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose?: () => void;
};
