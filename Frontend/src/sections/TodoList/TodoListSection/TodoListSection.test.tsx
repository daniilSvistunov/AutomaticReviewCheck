import '@testing-library/jest-dom';

import RootDataWrapper from '@layouts/RootDataWrapper';
import { store } from '@redux/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import TodoListSection from './TodoListSection';

describe('AddingComponent', () => {
  it('render the component', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReduxProvider store={store}>
          <RootDataWrapper>
            <TodoListSection />
          </RootDataWrapper>
        </ReduxProvider>
      </Router>
    );

    const ItemList = screen.getByRole('list');
    const itemCount = ItemList.childElementCount;
    const listFromStore = store.getState().list.tasks.length;

    expect(ItemList).toBeInTheDocument();
  });
});
