import { LoadingScreenContainer } from '@components/loading-screen';
import RootDataWrapper from '@layouts/RootDataWrapper';
import { ElementType, lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { matchRoutes, RouteObject, useLocation, useRoutes } from 'react-router-dom';

import AuthGuard from '../auth/AuthGuard';

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
const SamplePage = Loadable(lazy(() => import('../pages/SamplePage')));

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
        element: <SamplePage />,
      },
      // TODO: further paths can be added here
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
