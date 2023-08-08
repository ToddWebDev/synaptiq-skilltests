# Synaptiq React Skills Test

## Date Picker

### Submitted by Todd Rizzolo on August 8, 2023

## Instructions

### Storybook

Run `npm run storybook`
Learn about the date picker component and it's props and use-cases.

### App

Run `npm run dev` and go to 'http://localhost:3000/date-pickers'
Interact with the date picker component as a 'Start Date'.

### Unit Tests

Run `npm run test`
Verify unit tests pass successfully. Verify unit tests are aligned with desired functionality.

### Description

The date picker component is implemented with the shopify polaris UI library and is built with accessibility in mind. It is built to be responsive.

It uses semantic html elements along with aria roles and labels so that it can be described by screen readers. When the calendar is focused, it is able to be navigated with the keyboard arrows and the enter/return key selects the highlighted date. It is configurable with custom props to meet a variety of use-cases.

The date picker component follows existing component and story implementation patterns for html, css and js. It is mobile-first in implementation.

## Future Enhancements

- Add date range variant
- Add date list variant
- Make text field editable
- Additional date formats support
- Consider time zones and edge-cases
- Consider date format localization
