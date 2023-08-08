'use client'
import React from 'react'
import { Page } from '@shopify/polaris'
import SingleDatePicker from '../components/SingleDatePicker'

export default function DatePickers() {
  return (
    <Page title='Date Pickers' subtitle='Single Date Picker'>
      <form>
        <SingleDatePicker label='Start Date' />
      </form>
    </Page>
  )
}
