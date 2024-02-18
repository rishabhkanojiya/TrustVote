import { Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { styled } from 'styled-components'
import { LoginContext, ShowPopupContext } from '../../../context'
import { Consume } from '../../../context/Consumer'
import { AuthService } from '../../../services/auth.services'

const Wrapper = styled.div`
  height: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const StyledLink = styled(Link)`
  color: #ce93d8;
`

const Login = ({ ShowPopupData, LoginData }) => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  const onSubmit = async (data) => {
    try {
      const result = await AuthService.login(data)
    } catch (err) {
      ShowPopupData.setPopupMessageObj(err.response.data, 'error')
    }
  }

  return (
    <Wrapper>
      <Container maxWidth='sm'>
        <Typography variant='h4' align='center' gutterBottom>
          Login
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
          <TextField
            id='password'
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            required
            {...register('password')}
          />
          <Button variant='contained' color='secondary' type='submit' fullWidth>
            Login
          </Button>
          <Typography mt={2} variant='body2' align='center'>
            Don't have an account?{' '}
            <StyledLink to='/auth/register'>Register</StyledLink>
          </Typography>
          <Typography variant='body2' align='center'>
            <StyledLink to='/auth/forgot-password'>Forgot password?</StyledLink>
          </Typography>
        </form>
      </Container>
    </Wrapper>
  )
}

export default Consume(Login, [ShowPopupContext, LoginContext])
