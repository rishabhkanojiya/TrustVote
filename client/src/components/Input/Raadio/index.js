import React, { useState } from 'react'

const RadioButtonGroup = ({ options, register, name }) => {
  const [selectedOption, setSelectedOption] = useState('')

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type='radio'
            value={option}
            checked={selectedOption === option}
            onChange={handleRadioChange}
            {...register(name)}
          />
          {option}
        </label>
      ))}

      <p>Selected option: {selectedOption}</p>
    </div>
  )
}

export default RadioButtonGroup
