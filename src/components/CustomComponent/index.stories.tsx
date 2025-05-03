import type { Meta, StoryObj } from "@storybook/react";

import CustomComponent from "./index";

const meta: Meta<typeof CustomComponent> = {
  title: 'Components/CustomComponent',
  component: CustomComponent,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomComponent>;

export const Default: Story = {
  args: {},
};
