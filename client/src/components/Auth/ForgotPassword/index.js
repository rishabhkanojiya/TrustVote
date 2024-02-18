import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthService } from '../../../services/auth.services'
import { Consume } from '../../../context/Consumer'
import { LoginContext, ShowPopupContext } from '../../../context'
import { useForm } from 'react-hook-form'

const ForgotPassword = ({ ShowPopupData, LoginData }) => {
  const history = useHistory()

  const { register, handleSubmit } = useForm({ mode: 'onSubmit' })

  const onSubmit = (data) => {
    ShowPopupData.setPopupMessageObj(
      { message: 'Password Reset Email Sent' },
      'success'
    )
    AuthService.forgotPassword(data)
      .then((result) => {
        history.push('/login')
      })
      .catch((err) => {
        ShowPopupData.setPopupMessageObj(err.response.data, 'error')
      })
  }
  return (
    <Wrapper>
      <Container maxWidth='sm'>
        <Typography variant='h4' align='center' gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id='email'
            label='Email'
            type='email'
            fullWidth
            margin='normal'
            required
            {...register('email')}
          />
          <Button variant='contained' color='secondary' type='submit' fullWidth>
            Reset Password
          </Button>
          <Typography mt={2} variant='body2' align='center'>
            Remembered your password?{' '}
            <StyledLink to='/auth/login'>Login</StyledLink>
          </Typography>
        </form>
      </Container>
    </Wrapper>
  )
}

export default Consume(ForgotPassword, [ShowPopupContext, LoginContext])
