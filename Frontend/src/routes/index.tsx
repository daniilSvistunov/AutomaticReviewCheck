import { LoadingScreenContainer } from '@components/loading-screen';
import TaskDataWrapper from '@layouts/tasks/TaskDataWrapper';
import Page403 from '@pages/Page403';
import { ElementType, lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { matchRoutes, RouteObject, useLocation, useRoutes } from 'react-router-dom';

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
const TasksPage = Loadable(lazy(() => import('../pages/tasks/TasksPage')));

// Router
// ----------------------------------------------------------------------------
const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <TaskDataWrapper>
          <Outlet />
        </TaskDataWrapper>
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Navigate to={PATH_PAGE.tasks.root} />,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
        errorElement: <Page403 />,
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
