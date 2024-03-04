import { getRoutingPrefix } from '../utils/getRoutingPrefix';

const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROUTING_PREFIX = getRoutingPrefix();
const ROOT_ERRORS = `/${ROUTING_PREFIX}error`;
const ROOT_TODO = `/${ROUTING_PREFIX}todo`

export const PATH_PAGE = {
  todo: {
    root: ROOT_TODO,
  },
  
  error: {
    root: ROOT_ERRORS,
    error: path(ROOT_ERRORS, '/error'),
  },
};
