import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
	title: 'Components/StatusBadge',
	component: StatusBadge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: { type: 'select' },
			options: ['ACTIVE', 'BLOCKED', 'INACTIVE', 'PENDING', 'APPROVED', 'REJECTED'],
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
	args: {
		status: 'ACTIVE',
		size: 'md',
	},
};

export const Blocked: Story = {
	args: {
		status: 'BLOCKED',
		size: 'md',
	},
};

export const Inactive: Story = {
	args: {
		status: 'INACTIVE',
		size: 'md',
	},
};

export const Pending: Story = {
	args: {
		status: 'PENDING',
		size: 'md',
	},
};

export const Approved: Story = {
	args: {
		status: 'APPROVED',
		size: 'md',
	},
};

export const Rejected: Story = {
	args: {
		status: 'REJECTED',
		size: 'md',
	},
};

export const Small: Story = {
	args: {
		status: 'ACTIVE',
		size: 'sm',
	},
};

export const Large: Story = {
	args: {
		status: 'ACTIVE',
		size: 'lg',
	},
};
