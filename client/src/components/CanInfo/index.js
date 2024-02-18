import React from 'react'
import Candidate from '../Candidate'
import { Box } from '@mui/system'
import { Button } from '@mui/base'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ce93d8;
`

const CanInfo = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Candidate />
      <StyledLink to='/vote/12'>Vote</StyledLink>
      <Candidate />
    </Box>
  )
}

export default CanInfo
