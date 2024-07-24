import { type AppStore, type RootState, storeSetUp } from '@redux/store';
import { type RenderOptions, render } from '@testing-library/react';
import { type PropsWithChildren, type ReactElement } from 'react';
import { Provider } from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProvider(
  ui: ReactElement,
  {
    preloadedState = {},
    store = storeSetUp(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
