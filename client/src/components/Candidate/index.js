import React from 'react'
import './Candidate.styles.scss'
import ChartsMain from '../Charts/ChartsMain'

const Candidate = ({ type }) => {
  return (
    <div class={`candidate ${type}`}>
      <div class='candidate_data'>
        <img
          className='candidate_data--img'
          src='https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTS8b7FOAAhCCDZp_OHawNMrrHi5yBQu4jbroMx5nSUiftM-jROP8m1c3KRlw0B0hVURlNl1V33uXhUHZg'
          alt=''
        />

        <div class='candidate_data--info'>
          <div class='candidate_header'>Trump</div>
          <div class='candidate_desc'>
            <div class='candidate_desc--tweets'>test</div>
          </div>
        </div>
      </div>
      <div class='candidate_trend'>
        <ChartsMain type={type} />
      </div>
    </div>
  )
}

export default Candidate
