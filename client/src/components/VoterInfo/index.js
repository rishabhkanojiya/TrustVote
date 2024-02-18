import React from 'react'
import Candidate from '../Candidate'
import './voter.styles.scss'
import { Link } from 'react-router-dom'

const VoterInfo = () => {
  return (
    <div className='candidates'>
      <Candidate type={'candidate_red'} />
      <div className='vs'></div>
      <Link className='vote' to='/voting/12'>
        VOTE
      </Link>
      <Candidate type={'candidate_blue'} />
    </div>
  )
}

export default VoterInfo
