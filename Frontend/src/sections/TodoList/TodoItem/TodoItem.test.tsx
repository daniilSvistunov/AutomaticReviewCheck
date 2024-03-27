import '@testing-library/jest-dom';

import { store } from '@redux/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import TodoItem from './TodoItem';

describe('AddingComponent', () => {
  it('render the component', () => {
    const Task = {
      todo: 'Hey',
      id: 15,
      Date: '2024-04-03',
      importance: 0,
      Finished: true,
    };

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReduxProvider store={store}>
          <TodoItem Task={Task} />
        </ReduxProvider>
      </Router>
    );
    const TaskItem = screen.getByRole('checkbox');
    expect(TaskItem).toBeChecked();
  });

  it('change checked state', () => {
    const Task = {
      todo: 'Hey',
      id: 0,
      Date: '2024-04-03',
      importance: 0,
      Finished: false,
    };

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReduxProvider store={store}>
          <TodoItem Task={Task} />
        </ReduxProvider>
      </Router>
    );
    const TaskItem = screen.getByRole('checkbox');
    fireEvent.click(TaskItem);
    expect(TaskItem).toBeChecked();
  });
});
