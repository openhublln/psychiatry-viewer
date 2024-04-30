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

export const RadarLineChart = ({
  dataSet,
  scorelabels,
  dataName,
  chartWidth = '480px',
  chartHeight = '480px',
  minValue = 0,
  maxValue,
  colors,
  isDivide,
  changeStartAngle,
}) => {
  const options = {
    plugins: {
      legend: {
        display: false,
        font: { size: 13 },
      },
      title: {
        display: true,
        text: dataName,
        font: { size: '30' },
        padding: {
          bottom: 25,
        },
      },
    },
    scales: {
      r: {
        startAngle: changeStartAngle ? 180 / dataSet[0].data.length : 0,
        angleLines: {
          display: false,
        },
        min: minValue,
        max: maxValue,
        pointLabels: {
          font: {
            size: 13,
          },
        },
        ticks: {
          count: 5,
          stepSize: 2,
       }
      },
    },
    
  }

  const plugins = [
    {
      id: 'customLine',
      afterDatasetDraw: (chart, args, options) => {
        const { ctx, chartArea } = chart
        const { meta } = args

        // only do the first dataset lines, if you remove this if it will draw lines for all datasets
        if (meta.index > 0) {
          return
        }

        const radarScale = chart.scales.r

        meta.data.forEach((dataPoint, i) => {
          //default line color black as fallback if no color is specified
          ctx.strokeStyle = colors ? colors[i] : options.lineColor || 'black'
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(radarScale.xCenter, radarScale.yCenter)
          ctx.lineTo(dataPoint.x, dataPoint.y)
          ctx.stroke()
        })

        if (isDivide) {
          ctx.strokeStyle = 'black'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(radarScale.xCenter, chartArea.top)
          ctx.lineTo(radarScale.xCenter, chartArea.height + chartArea.top)
          ctx.stroke()
        }
      },
    },
  ]

  let radarDataSet = dataSet.map((d) => {
    return {
      label: `${dataName}`,
      data: d.data,
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 1,
      opacity: 0,
      fill: false,
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
        plugins={plugins}
      />
    </div>
  )
}
