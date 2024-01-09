import { ReactNode, useEffect } from 'react';

import { fetchEmployees } from '../../redux/slices/employees';
import { fetchTeams } from '../../redux/slices/teams';
import { useDispatch, useSelector } from '../../redux/store';

// ----------------------------------------------------------------------
type Props = { children: ReactNode };
const RootDataWrapper = ({ children }: Props) => {
  const dispatch = useDispatch();

  const {
    list: {
      status: { fetch: getEmployees },
    },
  } = useSelector((state) => state.employees);

  const {
    list: {
      status: { fetch: getTeams },
    },
  } = useSelector((state) => state.teams);

  useEffect(() => {
    getEmployees === 'idle' && dispatch(fetchEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEmployees]);

  useEffect(() => {
    getTeams === 'idle' && dispatch(fetchTeams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTeams]);

  return <>{children}</>;
};

export default RootDataWrapper;
