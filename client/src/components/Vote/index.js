import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { LoginContext, ShowPopupContext } from '../../context'
import { Consume } from '../../context/Consumer'
import { AuthService } from '../../services/auth.services'
import RadioButtonGroup from '../Input/Raadio'

const Vote = ({ ShowPopupData, LoginData }) => {
  const history = useHistory()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm({ mode: 'onSubmit' })

  const onSubmit = (data) => {
    AuthService.register(data)
      .then((result) => {
        LoginData.setUserObj(result)
        history.push('/login')
      })
      .catch((err) => {
        ShowPopupData.setPopupMessageObj(err.response.data, 'error')
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioButtonGroup
        options={['trump', 'biden']}
        register={register}
        name='vote'
      />
      {/* <TextField
        id='firstName'
        label='First Name'
        fullWidth
        margin='normal'
        required
        {...register('firstName')}
      /> */}
    </form>
  )
}

export default Consume(Vote, [ShowPopupContext, LoginContext])
