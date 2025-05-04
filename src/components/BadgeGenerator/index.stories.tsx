import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BadgeGenerator from './index';

const meta: Meta<typeof BadgeGenerator> = {
  title: 'Components/BadgeGenerator',
  component: BadgeGenerator,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BadgeGenerator>;

export const Default: Story = {
  render: (args) => <BadgeGenerator {...args} />,
};

export const PreFilledExample: Story = {
  render: (args) => (
    <BadgeGenerator
      {...args}
      // @ts-ignore
      className=""
    />
  ),
  play: async ({ canvasElement }) => {
    const input: HTMLInputElement | null =
      canvasElement.querySelector('input#url');
    if (input) {
      input.value = 'https://github.com/facebook/react';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};
