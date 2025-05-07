import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ShieldsBadge from './index';

const meta: Meta<typeof ShieldsBadge> = {
    title: 'Components/ShieldsBadge',
    component: ShieldsBadge,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof ShieldsBadge>;

export const Default: Story = {
    render: (args) => <ShieldsBadge {...args} />,
    args: {
        label: 'visits',
        message: '5 / 200',
        color: '#4CAF50',
        labelBg: '#555',
        borderStyle: 'round',
    },
};

export const CustomColors: Story = {
    render: (args) => <ShieldsBadge {...args} />,
    args: {
        label: 'downloads',
        message: '120 / 2200',
        color: '#2196F3',
        labelBg: '#000',
        borderStyle: 'square',
    },
};

export const NoneBorder: Story = {
    render: (args) => <ShieldsBadge {...args} />,
    args: {
        label: 'stars',
        message: '10 / 1000',
        color: '#FF9800',
        borderStyle: 'none',
    },
};
