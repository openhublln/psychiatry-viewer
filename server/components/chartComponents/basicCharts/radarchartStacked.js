import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

export const RadarChartStacked = ({
  dataSet,
  dataName,
  chartWidth = '520px',
  chartHeight = '520px',
  minValue = 0,
  maxValue,
}) => {
  const plugins = [
    {
      beforeInit: function (chart, args, options) {
        chart.legend.afterFit = function () {
          this.height = this.height - 200
        }
      },
    },
  ]

  const options = {
    plugins: {
      title: {
        display: true,
        align: 'center',
        text: dataName,
        font: {
          size: 14,
        },
      },
      filler: {
        propagate: false,
      },
      'samples-filler-analyser': {
        target: 'chart-analyser',
      },
      legend: {},
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: minValue,
        suggestedMax: maxValue,
        pointLabels: {
          font: {
            size: 13,
          },
        },
      },
    },
    interaction: {
      intersect: false,
    },
  }

  return (
    <div
      className="radarGraphDiv"
      style={{
        width: chartWidth,
        height: chartHeight,
        margin: '0 auto',
      }}
    >
      {
        <Radar
          key={JSON.stringify(dataSet)}
          data={dataSet}
          label={dataName}
          options={options}
          plugins={plugins}
        />
      }
    </div>
  )
}
