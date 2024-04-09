import { LoadingScreenContainer } from '@components/loading-screen';
import RootDataWrapper from '@layouts/RootDataWrapper';
import { ElementType, lazy, Suspense } from 'react';
import { matchRoutes, Outlet, RouteObject, useLocation, useRoutes } from 'react-router-dom';

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
const SamplePage = Loadable(lazy(() => import('@pages/SamplePage')));
const Page404 = Loadable(lazy(() => import('@pages/errors/Page404')));

// Router
// ----------------------------------------------------------------------------
const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RootDataWrapper>
        <Outlet />
      </RootDataWrapper>
    ),
    children: [
      {
        path: '',
        element: <SamplePage />,
      },
      // TODO: further paths can be added here
    ],
  },
  {
    path: '*',
    element: <Page404 />,
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
