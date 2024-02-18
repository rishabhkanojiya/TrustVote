import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Radio, RadioGroup, FormControlLabel, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import CanInfo from '../CanInfo'

const Vote = () => {
  let { voteId } = useParams()
  const { control, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <CanInfo />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='gender'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <RadioGroup
                {...field}
                row // If you want to display radio buttons horizontally
              >
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Male'
                />
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Female'
                />
              </RadioGroup>
            )}
          />
          <Button>Submit</Button>
        </form>
      </Box>
    </>
  )
}

export default Vote
