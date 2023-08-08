import { useState, useEffect, useRef } from 'react'
import {
  AppProvider,
  Popover,
  Card,
  DatePicker,
  Icon,
  TextField,
} from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'
import { CalendarMinor } from '@shopify/polaris-icons'
import { Button } from './Button'
import '@shopify/polaris/build/esm/styles.css'
import './datepicker.css'

interface SingleDatePickerProps {
  /**
   * Date Input Label
   */
  label: string
  /**
   * Date Format
   */
  dateFormat?: 'short' | 'long'
  /**
   * Disable Dates Before
   */
  disableDatesBefore?: Date
  /**
   * Disable Dates After
   */
  disableDatesAfter?: Date
  /**
   *  On Change function called when date is selected
   */
  onChange?: () => null
}

type SelectedDate = {
  month: number
  year: number
}

export default function SingleDatePicker({
  label,
  dateFormat = 'short',
  disableDatesBefore,
  disableDatesAfter,
  onChange,
}: SingleDatePickerProps) {
  const [visible, setVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [{ month, year }, setDate] = useState<SelectedDate>({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  })

  // Set up date format options
  const options: Intl.DateTimeFormatOptions = {
    weekday: dateFormat === 'long' ? 'long' : undefined,
    year: 'numeric',
    month: dateFormat === 'long' ? 'long' : 'short',
    day: 'numeric',
  }
  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    'en-US',
    options
  )

  const formattedValue: string = formatter.format(selectedDate)
  const datePickerRef = useRef(null)

  function handleInputValueChange() {
    console.log('handleInputValueChange')
  }

  function handleOnClose() {
    setVisible(false)
  }
  function handleMonthChange(month: number, year: number) {
    setDate({ month, year })
  }
  function handleDateSelection({ end: newSelectedDate }) {
    setSelectedDate(newSelectedDate)
    setVisible(false)
    if (typeof onChange === 'function') {
      onChange()
    }
  }
  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      })
    }
  }, [selectedDate])
  return (
    // Wrap in AppProvider for storybook implementation
    <AppProvider i18n={enTranslations}>
      <div className='datepicker-container'>
        <Popover
          aria-expanded={visible}
          active={visible}
          autofocusTarget='none'
          preferredAlignment='left'
          fullWidth
          preferInputActivator={false}
          preferredPosition='below'
          preventCloseOnChildOverlayClick
          onClose={handleOnClose}
          activator={
            <div className='datepicker-activator'>
              <TextField
                readOnly
                role='combobox'
                id='date-input'
                label={label}
                prefix={<Icon source={CalendarMinor} />}
                value={formattedValue}
                onFocus={() => setVisible(true)}
                onChange={handleInputValueChange}
                autoComplete='off'
              />
              <Button
                primary
                size='medium'
                label={`Select ${label}`}
                onClick={() => setVisible(true)}
              />
            </div>
          }
        >
          <div ref={datePickerRef} role='list'>
            <Card>
              <DatePicker
                month={month}
                year={year}
                selected={selectedDate}
                onMonthChange={handleMonthChange}
                onChange={handleDateSelection}
                disableDatesBefore={disableDatesBefore}
                disableDatesAfter={disableDatesAfter}
              />
            </Card>
          </div>
        </Popover>
      </div>
    </AppProvider>
  )
}
