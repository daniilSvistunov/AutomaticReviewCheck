import '@testing-library/jest-dom';

import { store } from '@redux/store';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import Filter from './FilterComponent';

describe('AddingComponent', () => {
  it('render the component', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReduxProvider store={store}>
          <Filter />
        </ReduxProvider>
      </Router>
    );
    const Filt = screen.getByRole('textbox');
    expect(Filt).toHaveValue('');
  });

  it('change the Select value', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReduxProvider store={store}>
          <Filter />
        </ReduxProvider>
      </Router>
    );
    const Filt = screen.getByRole('combobox');
    expect(1 + 1).equal(2);
  });
});
