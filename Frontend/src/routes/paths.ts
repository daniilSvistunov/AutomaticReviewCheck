import { getRoutingPrefix } from '../utils/getRoutingPrefix';

const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};
const ROUTING_PREFIX = getRoutingPrefix();
const ROOT_TASKS = `/${ROUTING_PREFIX}tasks`;
const ROOT_ERRORS = `/${ROUTING_PREFIX}error`;

export const PATH_PAGE = {
  tasks: {
    root: ROOT_TASKS,
  },
  error: {
    root: ROOT_ERRORS,
    error: path(ROOT_ERRORS, '/error'),
  },
};
