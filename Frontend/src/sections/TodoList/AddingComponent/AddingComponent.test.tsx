import '@testing-library/jest-dom';

import RootDataWrapper from '@layouts/RootDataWrapper';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { store } from '@redux/store';
import { useSelector } from '@redux/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import AddingTasks from './AddingComponent';

describe('AddingComponent', () => {
  it('render the component', () => {
    const history = createMemoryHistory();
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router history={history}>
          <ReduxProvider store={store}>
            <RootDataWrapper>
              <AddingTasks />
            </RootDataWrapper>
          </ReduxProvider>
        </Router>
      </LocalizationProvider>
    );

    const ItemList = screen.getByRole('combobox');
    expect(ItemList).toBeInTheDocument();
  });
});
