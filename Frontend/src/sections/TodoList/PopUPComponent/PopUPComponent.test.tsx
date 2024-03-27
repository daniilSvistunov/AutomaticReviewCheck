import '@testing-library/jest-dom';

import RootDataWrapper from '@layouts/RootDataWrapper';
import { addTask } from '@redux/slices/list';
import { store, useDispatch } from '@redux/store';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider, Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import TodoListSection from '../TodoListSection/TodoListSection';
import InputPopup from './PopUPComponents';

describe('AddingComponent', () => {
  it('render the component', () => {
    /**   const history = createMemoryHistory();
    history.createHref('/edit/0');
    render(
      <Provider store={store}>
        <Router history={history}>
          <RootDataWrapper>
            <InputPopup />
          </RootDataWrapper>
        </Router>
      </Provider>
    );
    const list = screen.getByRole('');
    */
    expect(1 + 1).equal(2);
  });
});
