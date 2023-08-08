import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SingleDatePicker from './DatePicker'

describe('Date Picker', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('renders SingleDatePicker with label and button text', () => {
    const label = 'Date'
    render(<SingleDatePicker label={label} />)
    const labelElement = screen.getByText(label)
    expect(labelElement).toBeInTheDocument()
    const buttonElement = screen.getByText('Select Date')
    expect(buttonElement).toBeDefined()
  })

  it('displays selected date when date is chosen in short format', () => {
    const label = 'Date'
    const today = new Date()
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat('en-US', options)
    const shortMonth = formatter.format(today)
    render(<SingleDatePicker label={label} />)
    const inputElement = screen.getByRole('combobox', { name: label })

    fireEvent.focus(inputElement)
    fireEvent.click(inputElement) // Open the date picker

    const dateElement = screen.getByText(today.getDate()) // Date you expect to be selected
    fireEvent.click(dateElement) // Select a date

    expect(inputElement).toHaveValue(shortMonth)
  })

  it('displays selected date when date is chosen in long format', () => {
    const label = 'Date'
    const today = new Date()
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat('en-US', options)
    const longFormat = formatter.format(today)

    render(<SingleDatePicker label={label} dateFormat='long' />)
    const inputElement = screen.getByRole('combobox', { name: label })

    fireEvent.focus(inputElement)
    fireEvent.click(inputElement) // Open the date picker

    const dateElement = screen.getByText(today.getDate()) // Date you expect to be selected
    fireEvent.click(dateElement) // Select a date

    expect(inputElement).toHaveValue(longFormat)
  })

  it('calls onChange when date is selected', () => {
    const label = 'Date'
    const onChangeMock = jest.fn()
    render(<SingleDatePicker label={label} onChange={onChangeMock} />)
    const inputElement = screen.getByRole('combobox', { name: label })

    fireEvent.focus(inputElement)
    fireEvent.click(inputElement) // Open the date picker

    const dateElement = screen.getByText('1') // Date you expect to be selected
    fireEvent.click(dateElement) // Select a date

    expect(onChangeMock).toHaveBeenCalled()
  })
})
