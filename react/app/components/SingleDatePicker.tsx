import { useState, useEffect, useRef } from 'react'
import {
  AppProvider,
  Box,
  Popover,
  Card,
  DatePicker,
  Icon,
  TextField,
} from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'
import { CalendarMinor } from '@shopify/polaris-icons'
import '@shopify/polaris/build/esm/styles.css'

interface SingleDatePickerProps {
  /**
   * Date Input Label
   */
  label: string
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
  const formattedValue = selectedDate.toISOString().slice(0, 10)
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
      <Box maxWidth='330px'>
        <Popover
          active={visible}
          autofocusTarget='none'
          preferredAlignment='left'
          fullWidth
          preferInputActivator={false}
          preferredPosition='below'
          preventCloseOnChildOverlayClick
          onClose={handleOnClose}
          activator={
            <TextField
              id='date-input'
              label={label}
              prefix={<Icon source={CalendarMinor} />}
              value={formattedValue}
              onFocus={() => setVisible(true)}
              onChange={handleInputValueChange}
              autoComplete='off'
            />
          }
        >
          <div ref={datePickerRef}></div>
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
        </Popover>
      </Box>
    </AppProvider>
  )
}
