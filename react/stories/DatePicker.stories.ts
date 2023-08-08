import type { Meta, StoryObj } from '@storybook/react'
import SingleDatePicker from './DatePicker'

const meta = {
  title: 'Example/DatePicker',
  component: SingleDatePicker,
} satisfies Meta<typeof SingleDatePicker>

export default meta
type Story = StoryObj<typeof meta>

const today = new Date()
const twoWeeksFromToday = new Date(today)
twoWeeksFromToday.setDate(today.getDate() + 14)

export const DatePicker: Story = {
  args: {
    label: 'Date',
  },
}

export const DateFormat: Story = {
  args: {
    label: 'Date',
    dateFormat: 'long',
  },
}

export const DisabledDatesBefore: Story = {
  args: {
    label: 'Date',
    disableDatesBefore: today,
  },
}

export const DisabledDatesAfter: Story = {
  args: {
    label: 'Date',
    disableDatesAfter: twoWeeksFromToday,
  },
}
