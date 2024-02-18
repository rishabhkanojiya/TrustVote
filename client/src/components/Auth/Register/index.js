import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { LoginContext, ShowPopupContext } from '../../../context'
import { Consume } from '../../../context/Consumer'
import { AuthService } from '../../../services/auth.services'

const Register = ({ ShowPopupData, LoginData }) => {
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

  let passwordMatchValidation = {
    required: true,
    validate: {
      passwordMatch: (value) => value === getValues().password,
    },
  }

  useEffect(() => {
    if (errors?.confirmPassword?.type === 'passwordMatch') {
      ShowPopupData.setPopupMessageObj(
        { message: 'Passwords do not match' },
        'error'
      )
      clearErrors('confirmPassword')
    }
  }, [errors?.confirmPassword?.type])

  return (
    <Wrapper>
      <Container maxWidth='sm'>
        <Typography variant='h4' align='center' gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id='firstName'
            label='First Name'
            fullWidth
            margin='normal'
            required
            {...register('firstName')}
          />
          <TextField
            id='lastName'
            label='Last Name'
            fullWidth
            margin='normal'
            required
            {...register('lastName')}
          />
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
          <TextField
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            fullWidth
            margin='normal'
            required
            {...register('confirmPassword', passwordMatchValidation)}
          />
          <Button variant='contained' color='secondary' type='submit' fullWidth>
            Register
          </Button>
          <Typography mt={2} variant='body2' align='center'>
            Already have an account?{' '}
            <StyledLink to='/auth/login'>Login</StyledLink>
          </Typography>
        </form>
      </Container>
    </Wrapper>
  )
}

export default Consume(Register, [ShowPopupContext, LoginContext])
