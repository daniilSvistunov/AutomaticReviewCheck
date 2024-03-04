import { ReactNode } from 'react';

// ----------------------------------------------------------------------
type Props = { children: ReactNode };
const TodoDataWrapper = ({ children }: Props) => {
  return <>{children}</>;
};

export default TodoDataWrapper;
