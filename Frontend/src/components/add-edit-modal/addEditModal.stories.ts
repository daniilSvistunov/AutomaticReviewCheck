import type { Meta, StoryObj } from '@storybook/react';

import AddEditModal from './addEditModal';

const meta = {
  title: 'Components/AddEditModal',
  component: AddEditModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AddEditModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    isDirty: true,
    title: 'title',
  },
};