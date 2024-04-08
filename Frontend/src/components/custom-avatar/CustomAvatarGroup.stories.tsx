import type { Meta, StoryObj } from '@storybook/react';

import CustomAvatar from './CustomAvatar';
import CustomAvatarGroup from './CustomAvatarGroup';

const meta: Meta<typeof CustomAvatarGroup> = {
  title: 'Components/CustomAvatar/AvatarGroup',
  component: CustomAvatarGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { 
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large'],
    },
    compact: { control: 'boolean' },
  },
  args: {
    size: 'small',
    compact: false,
  },
} satisfies Meta<typeof CustomAvatarGroup>;

export default meta;
type Story = StoryObj<typeof CustomAvatarGroup>;

export const Empty: Story = {};

export const Single: Story = {
  args: {
  },
  render: (args) => (
    <CustomAvatarGroup {...args}>
      <CustomAvatar name="name" />
    </CustomAvatarGroup>
  )
};

export const Multiple: Story = {
  args: {  
  },
  render: (args) => (
    <CustomAvatarGroup {...args}>
      <CustomAvatar key='1' name="Fred" />
      <CustomAvatar key='2' name="Oliver" />
      <CustomAvatar key='3' name="Octavia" />
    </CustomAvatarGroup>
  )
};

export const Compact: Story = {
  args: {
    compact: true,
  },
  render: (args) => (
    <CustomAvatarGroup {...args}>
      <CustomAvatar key='1' name="Fred" />
      <CustomAvatar key='2' name="Oliver" />
      <CustomAvatar key='3' name="Octavia" />
    </CustomAvatarGroup>
  )
};

export const Tiny: Story = {
  args: {
    size: 'tiny',
  },
  render: (args) => (
    <CustomAvatarGroup {...args}>
      <CustomAvatar key='1' name="Fred" />
      <CustomAvatar key='2' name="Oliver" />
      <CustomAvatar key='3' name="Octavia" />
    </CustomAvatarGroup>
  )
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => (
    <CustomAvatarGroup {...args}>
      <CustomAvatar key='1' name="Fred" />
      <CustomAvatar key='2' name="Oliver" />
      <CustomAvatar key='3' name="Octavia" />
    </CustomAvatarGroup>
  )
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => (
    <CustomAvatarGroup {...args}>
      <CustomAvatar key='1' name="Fred" />
      <CustomAvatar key='2' name="Oliver" />
      <CustomAvatar key='3' name="Octavia" />
    </CustomAvatarGroup>
  )
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => (
    <CustomAvatarGroup {...args}>
      <CustomAvatar key='1' name="Fred" />
      <CustomAvatar key='2' name="Oliver" />
      <CustomAvatar key='3' name="Octavia" />
    </CustomAvatarGroup>
  )
};

