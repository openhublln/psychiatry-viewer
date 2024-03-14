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
import { GraphType } from '../../../models/dataset'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

export const RadarChart = ({
  dataSet,
  scorelabels,
  dataName,
  chartWidth = '480px',
  chartHeight = '480px',
  fill = true,
  minValue = 0,
  maxValue,
  graphType = GraphType.alcohol,
}) => {
  const options = {
    scale: {
      gridLines: {
        color: ['black'],
      },
    },
    plugins: {
      legend: {
        display: graphType === GraphType.alcohol ? true : false,
        font: { size: 13 },
      },
      title: {
        display: true,
        text: dataName,
        font: { size: '30' },
      },
    },
    scales: {
      r: {
        grid:
          graphType === GraphType.depression
            ? {
                color: [
                  '#F5F5F5',
                  '#F5F5F5',
                  '#F5F5F5',
                  '#F5F5F5',
                  '#F5F5F5',
                  '#F5F5F5',
                  '#F5F5F5',
                ],
              }
            : {
                color: [
                  '#DCDCDC',
                  '#DCDCDC',
                  '#DCDCDC',
                  '#DCDCDC',
                  '#DCDCDC',
                  '#DCDCDC',
                  '#DCDCDC',
                ],
              },
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
  }

  let radarDataSet = dataSet.map((d, index) => {
    return {
      label: `${d.time}`,
      data: d.data,
      backgroundColor: dataSet[index].backgroundColor,
      borderColor: dataSet[index].borderColor,
      borderWidth: 1,
      opacity: 0.5,
      fill: fill,
    }
  })

  const data = {
    labels: scorelabels,
    datasets: radarDataSet,
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
      <Radar
        key={JSON.stringify(data)}
        data={data}
        label={dataName}
        options={options}
      />
    </div>
  )
}
