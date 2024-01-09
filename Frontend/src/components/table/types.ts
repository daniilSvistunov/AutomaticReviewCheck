// ----------------------------------------------------------------------

import { NestedKeyOf } from '../../models/typehelper';

export type TableProps<T extends object = never> = {
  dense: boolean;
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  //
  selected: string[];
  onSelectRow: (id: NestedKeyOf<T>) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  //
  onSort: (id: NestedKeyOf<T>) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

export type TableHeadField<T extends object = never> = {
  id: NestedKeyOf<T>;

  label?: string | null;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width?: number;
  minWidth?: number;
};
