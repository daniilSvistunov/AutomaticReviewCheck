import { PriorityHighRounded } from '@mui/icons-material';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import FilterValueMenu from './FilterValueMenu';

// ----------------------------------------------------------------------

describe('Component FilterValueMenu', () => {
  const icon = <PriorityHighRounded />;

  const label = 'Label';

  const onSelect = vi.fn();

  const values = ['Value 1', 'Value 2'];

  it('renders the menu button', () => {
    render(<FilterValueMenu {...{ icon, label, onSelect, values }} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();

    expect(button).toHaveTextContent(label);
  });

  it('renders the menu items', () => {
    render(<FilterValueMenu {...{ icon, label, onSelect, values }} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole('menuitem')).toHaveLength(values.length);

    values.forEach((value) => expect(screen.getByText(value)).toBeInTheDocument());
  });

  it('calls onSelect()', () => {
    render(<FilterValueMenu {...{ icon, label, onSelect, values }} />);

    values.forEach((value) => {
      fireEvent.click(screen.getByRole('button'));

      fireEvent.click(screen.getByText(value));
    });

    expect(onSelect).toHaveBeenCalledTimes(values.length);

    values.forEach((value, index) => {
      expect(onSelect).toHaveBeenNthCalledWith(index + 1, value);
    });
  });

  it('renders selected item', () => {
    render(<FilterValueMenu {...{ icon, label, onSelect, values }} selected={values[0]} />);

    expect(screen.getByRole('button')).toHaveTextContent(values[0]);
  });
});
