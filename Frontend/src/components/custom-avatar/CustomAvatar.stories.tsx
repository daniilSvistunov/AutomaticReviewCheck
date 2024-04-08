import type { Meta, StoryObj } from '@storybook/react';

import CustomAvatar from './CustomAvatar';

const meta = {
  title: 'Components/CustomAvatar/Avatar',
  component: CustomAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    color: { 
      control: 'select',
      options: ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'],
    },
    BadgeProps: { control: 'object' },
  },
  args: {
    name: '',
    color: 'default',
  },
  render: (args) => (
    <CustomAvatar {...args} />
  ),
} satisfies Meta<typeof CustomAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'name',
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    color: 'secondary',
  },
};

export const Info: Story = {
  args: {
    ...Default.args,
    color: 'info',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    color: 'warning',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    color: 'error',
  },
};