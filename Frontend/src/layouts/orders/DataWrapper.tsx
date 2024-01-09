import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchOrders } from '../../redux/slices/orders';
import { useDispatch, useSelector } from '../../redux/store';

const OrderDataWrapper = () => {
  const dispatch = useDispatch();
  const {
    status: { fetch },
  } = useSelector((state) => state.orders.list);

  useEffect(() => {
    fetch === 'idle' && dispatch(fetchOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  return <Outlet />;
};

export default OrderDataWrapper;
