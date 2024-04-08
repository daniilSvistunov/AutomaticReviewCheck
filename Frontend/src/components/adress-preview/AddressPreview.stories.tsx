import type { Meta, StoryObj } from '@storybook/react';

import AddressPreview from './AdressPreview';

const meta: Meta<typeof AddressPreview> = {
  title: 'Components/AddressPreview',
  component: AddressPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    address: { control: 'object' },
    customerName: { control: 'text' },
  },
  args: {},
} satisfies Meta<typeof AddressPreview>;

export default meta;
type Story = StoryObj<typeof AddressPreview>;

export const Default: Story = {
  args: {
    address: {
      receiverLineOne: 'receiverLineOne',
      receiverLineTwo: 'receiverLineTwo',
      receiverLineThree: 'receiverLineThree',
      street: 'street',
      city: 'city',
      postalCode: 'postalCode',
      country: 'country',
    },
    customerName: 'customerName',
  },
};