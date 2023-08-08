'use client'

import { useState } from 'react'
import { Button } from '../../stories/Button'

export default function SampleComponent() {
  const [showText, setShowText] = useState(false)
  return (
    <>
      <p>Sample Component with State</p>
      {showText && <p>text</p>}
      <Button
        label='Toggle Text'
        onClick={() => setShowText((prev) => !prev)}
      />
    </>
  )
}
