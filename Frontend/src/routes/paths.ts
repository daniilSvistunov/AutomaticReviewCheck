import { getRoutingPrefix } from '../utils/getRoutingPrefix';

const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROUTING_PREFIX = getRoutingPrefix();
const ROOT_ERRORS = `/${ROUTING_PREFIX}error`;

export const PATH_PAGE = {
  error: {
    root: ROOT_ERRORS,
    error: path(ROOT_ERRORS, '/error'),
  },
};
