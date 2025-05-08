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

export const WithCustomLabelColor: Story = {
    render: (args) => <ShieldsBadge {...args} />,
    args: {
        label: 'Issues',
        message: '20 Open',
        color: '#FF5722',
        labelBg: '#303F9F',
        borderStyle: 'round',
        labelColor: '#FFEB3B', // Custom label text color
    },
};

export const WithCustomMessageColor: Story = {
    render: (args) => <ShieldsBadge {...args} />,
    args: {
        label: 'Forks',
        message: '50 Total',
        color: '#4CAF50',
        labelBg: '#512DA8',
        borderStyle: 'square',
        messageColor: '#FFFFFF', // Custom message text color
    },
};

export const AllBorderStyles: Story = {
    render: (args) => (
        <div style={{ display: 'grid', gap: '20px' }}>
            <ShieldsBadge {...args} label="Square" message="50 / 500" borderStyle="square" />
            <ShieldsBadge {...args} label="Round" message="30 / 300" borderStyle="round" />
            <ShieldsBadge {...args} label="None" message="100 / 1000" borderStyle="none" />
        </div>
    ),
    args: {
        color: '#FF9800',
        labelBg: '#424242',
    },
};

export const LongText: Story = {
    render: (args) => <ShieldsBadge {...args} />,
    args: {
        label: 'Weekly Downloads',
        message: '50,000 / 500,000',
        color: '#673AB7',
        labelBg: '#000',
        borderStyle: 'round',
    },
};
