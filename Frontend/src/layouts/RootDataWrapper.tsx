import { fetchProperties, getTasks } from '@redux/slices/task';
import { dispatch } from '@redux/store';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

interface Props {
  children: ReactNode;
}

export default function RootDataWrapper({ children }: Readonly<Props>) {
  dispatch(getTasks());

  dispatch(fetchProperties());

  return <>{children}</>;
}
