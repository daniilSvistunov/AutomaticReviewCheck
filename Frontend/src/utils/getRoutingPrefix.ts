import { isAppRunningInPlattform } from './isAppRunningInPlattform';

export const getRoutingPrefix = (): string => {
  // If the app is running standalone, no prefix is needed for the routing
  if (!isAppRunningInPlattform()) {
    return '';
  }

  const urlSegments = location.pathname.split('/');
  // The routing prefix consists of the first two segments of the URL, e.g. erp/teams
  // slice exludes the end index, which is why we have the range 1 - 3
  const routingPrefix = urlSegments.slice(1, 3).join('/').concat('/');

  return routingPrefix;
};
