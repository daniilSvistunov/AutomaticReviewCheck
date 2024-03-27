import { fetchTasks, postTasks } from '@redux/slices/list';
import { useDispatch, useSelector } from '@redux/store';
import { ReactNode, useEffect } from 'react';

// ----------------------------------------------------------------------
type props = { children: ReactNode };

const RootDataWrapper = ({ children }: props) => {
  const status = useSelector((state) => state.list.state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') {
      console.log('re-render');
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  return <>{children}</>;
};
export default RootDataWrapper;
