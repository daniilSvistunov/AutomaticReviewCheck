import { type Task, initialState } from '@redux/slices/task';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@utils/test';
import { describe, expect, it } from 'vitest';

import TaskListCard from './TaskListCard';

describe('Component TaskListCard', () => {
  const list: Task[] = Array(2)
    .fill(0)
    .map((_, index) => ({
      id: index,
      title: String(index),
      checked: index % 2 === 0,
      due: new Date(),
      steps: [],
    }));

  const preloadedState = {
    task: {
      status: { ...initialState.status },
      error: { ...initialState.error },
      list,
      buckets: [],
      teams: [],
      assignees: [],
    },
  };

  it('renders its empty state', () => {
    renderWithProvider(<TaskListCard />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the tasks', () => {
    renderWithProvider(<TaskListCard />, { preloadedState });

    expect(screen.getAllByRole('checkbox')).toHaveLength(list.length);

    list.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it('renders the un-/checked state', () => {
    renderWithProvider(<TaskListCard />, { preloadedState });

    screen
      .getAllByRole('checkbox')
      .forEach((value, index) =>
        list[index].checked ? expect(value).toBeChecked() : expect(value).not.toBeChecked()
      );
  });
});
