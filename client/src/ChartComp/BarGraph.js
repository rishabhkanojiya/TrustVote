import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SubTitle,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import './charts.styles.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  SubTitle,
  Tooltip,
  Legend
)

const BarGraph = ({ options, data = {} }) => {
  return (
    <div className='chartClass'>
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarGraph
