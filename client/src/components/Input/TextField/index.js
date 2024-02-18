import React, { useState } from 'react'

const TextFieldExample = () => {
  const [textFieldValue, setTextFieldValue] = useState('')
  // Event handler for changes in the text field
  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value)
  }

  return (
    <div>
      <input
        type='text'
        value={textFieldValue}
        onChange={handleTextFieldChange}
        placeholder='Type something...'
      />
    </div>
  )
}

export default TextFieldExample
