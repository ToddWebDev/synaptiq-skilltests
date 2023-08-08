import type { Meta, StoryObj } from '@storybook/react'
import SingleDatePicker from '../app/components/SingleDatePicker'

const meta = {
  title: 'Example/DatePicker',
  component: SingleDatePicker,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
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

export const DisabledDatesBefore: Story = {
  args: {
    label: 'Start Date',
    disableDatesBefore: today,
  },
}

export const DisabledDatesAfter: Story = {
  args: {
    label: 'Start Date',
    disableDatesAfter: twoWeeksFromToday,
  },
}
