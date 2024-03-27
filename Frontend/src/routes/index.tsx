import { LoadingScreenContainer } from '@components/loading-screen';
import RootDataWrapper from '@layouts/RootDataWrapper';
import PopUPComponents from '@sections/TodoList/PopUPComponent/PopUPComponents';
import { ElementType, lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';
import { matchRoutes, useLocation, useRoutes } from 'react-router-dom';

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
//const SamplePage = Loadable(lazy(() => import('../pages/SamplePage')));

// Router
// ----------------------------------------------------------------------------
const App = Loadable(lazy(() => import('../pages/TodoListApp')));
const routes: RouteObject[] = [
  {
    path: '/',

    element: (
      <RootDataWrapper>
        <App />
      </RootDataWrapper>
    ),
    children: [
      {
        path: '/edit/:id',

        element: <PopUPComponents />,
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
      ?.map((match: { route: { path: any } }) => match.route.path)
      .join('/')
      .replace('//', '/') || ''
  );
};
