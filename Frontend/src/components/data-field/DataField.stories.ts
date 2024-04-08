import type { Meta, StoryObj } from '@storybook/react';

import DataField from './DataField';

const meta = {
  title: 'Components/DataField',
  component: DataField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DataField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'name',
    translation: 'translation',
  },
};

export const WithValue: Story = {
  args: {
    field: {
      name: 'name',
      translation: 'translation',
      value: 'value',
    },
  },
};

export const AsLink: Story = {
  args: {
    field: {
      name: 'name',
      translation: 'translation',
      value: 'value',
      link: true,
    },
  },
};