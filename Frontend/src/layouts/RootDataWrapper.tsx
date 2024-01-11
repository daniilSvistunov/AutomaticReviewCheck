import { ReactNode } from 'react';

// ----------------------------------------------------------------------
type Props = { children: ReactNode };
const RootDataWrapper = ({ children }: Props) => { 
  // TODO: this can be usesd to fetch initial data that's used within the whole application

  return <>{children}</>;
};

export default RootDataWrapper;
