import React from 'react'
import BarGraph from '../../ChartComp/BarGraph'

const ChartsMain = ({ type }) => {
  const chartsProps = {
    options: {
      indexAxis: 'y',
      responsive: true,
      legend: {
        display: true,
        position: 'bottom',
      },
      maintainAspectRatio: false,
      scale: {
        x: {
          display: false,
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
    },
    data: {
      labels: [''],
      datasets: [
        {
          label: 'POS',
          data: [10],
          backgroundColor:
            type == 'candidate_blue'
              ? 'rgba(59,70,240,255)'
              : 'rgba(34,34,34,255)',

          borderRadius: 20,
          stack: 'Stack 0',
        },
        {
          label: 'NEG',
          data: [4],
          backgroundColor: 'rgb(160,238,192)',
          borderRadius: 20,
          stack: 'Stack 1',
        },
      ],
    },
  }

  return <BarGraph {...chartsProps} />
}

export default ChartsMain
