import { useEffect } from 'react';

import { useSelector } from '../../redux/store';
import { publish } from './events';

// ----------------------------------------------------------------------------

const AppConnectorGateway = () => {
  const entityId = useSelector((state) => state.global.activeEntityId);

  useEffect(() => {
    publish('onChangeEntity', { entityId: entityId });
  }, [entityId]);

  return null;
};

export default AppConnectorGateway;
