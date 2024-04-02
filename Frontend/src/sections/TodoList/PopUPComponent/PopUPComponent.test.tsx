import '@testing-library/jest-dom';

import { getTasks } from '@api/tasks';
import RootDataWrapper from '@layouts/RootDataWrapper';
import { addTask } from '@redux/slices/list';
import { dispatch, store, useDispatch } from '@redux/store';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider, Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import TodoListSection from '../TodoListSection/TodoListSection';
import InputPopup from './PopUPComponents';

describe('PopUpComponent', () => {
  it('render the component', () => {
    const history = createMemoryHistory();
    history.createHref('/edit/0');
    const Task = {
      todo: 'hallo',
      id: 0,
      Date: '2025-04-03',
      importance: 0,
      Finished: false,
    };
    {
      store.dispatch(addTask(Task));
    }

    render(
      <ReduxProvider store={store}>
        <Router history={history}>
          <RootDataWrapper>
            <InputPopup />
          </RootDataWrapper>
        </Router>
      </ReduxProvider>
    );
    const list = screen.getByRole('');

    expect(list).toBeInTheDocument();
  });
});
