import { LoadingScreenContainer } from '@components/loading-screen';
import RootDataWrapper from '@layouts/RootDataWrapper';
import { ElementType, lazy, Suspense } from 'react';
import {
  matchRoutes,
  Navigate,
  Outlet,
  RouteObject,
  useLocation,
  useRoutes,
} from 'react-router-dom';

import AuthGuard from '../auth/AuthGuard';
import { PATH_PAGE } from './paths';

// ----------------------------------------------------------------------------

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreenContainer />}>
      <Component {...props} />
    </Suspense>
  );

// Lazy loaded pages
// ----------------------------------------------------------------------------
const TodoApp = Loadable(lazy(() => import('../pages/todo/TodoAppPage')));
const TodoDetails = Loadable(lazy(() => import('../pages/todo/TodoDetailsPage')));

// Router
// ----------------------------------------------------------------------------
const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <RootDataWrapper>
          <Outlet />
        </RootDataWrapper>
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Navigate to={PATH_PAGE.todo.root} />,
      },
      {
        path: 'todo',
        element: <TodoApp />,
      },
      {
        path: 'todo/:taskId', 
        element: <TodoDetails />,
      },
    ],
  },
];

const Router = () => useRoutes(routes);
export default Router;

// Utils
// ----------------------------------------------------------------------------
export const useCurrentPathPattern = () => {
  const location = useLocation();
  const matches = matchRoutes(routes, location);

  return (
    matches
      ?.map((match) => match.route.path)
      .join('/')
      .replace('//', '/') || ''
  );
};
