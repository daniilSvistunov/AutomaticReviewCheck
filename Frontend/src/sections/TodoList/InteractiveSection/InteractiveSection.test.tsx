import '@testing-library/jest-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { store } from '@redux/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import InteractiveSection from './InteractiveSectionComponenet';

describe('AddingComponent', () => {
  it('render the component', () => {
    const history = createMemoryHistory();
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router history={history}>
          <ReduxProvider store={store}>
            <InteractiveSection />
          </ReduxProvider>
        </Router>
      </LocalizationProvider>
    );
    const TaskItem = screen.getByRole('link');
    expect(TaskItem).toBeInTheDocument();
  });
});
