import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export function LineChart({
  dataSet,
  maxValue,
  dataName,
  chartWidth = '640px',
  chartHeight = '320px',
  ticksCallback,
  y1StepSize,
}) {
  let ticks = {}
  if(ticksCallback) {
    ticks = {
      stepSize: y1StepSize,
      callback: ticksCallback,
      font: { size: 12 },
    }
  } else {
    ticks = {
      stepSize: 5,
      font: { size: 12 },
  }
  }
  const options = {
    
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: dataName,
        font: { size: 18 },
      },
      legend: {
        dispaly: true,
      },
    },
    scales: {
      y: {
        dispaly: true,
        max: maxValue,
        min: 0,
        ticks: ticks,
      },
      x: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div
      className="lineChartDiv"
      style={{
        width: chartWidth,
        height: chartHeight,
      }}
    >
      <Line key={JSON.stringify(dataSet)} data={dataSet} options={options} />
    </div>
  )
}
