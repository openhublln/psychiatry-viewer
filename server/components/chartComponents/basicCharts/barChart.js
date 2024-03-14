import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import gradient from 'chartjs-plugin-gradient'
import { GraphType } from '../../../models/dataset'
import { getScoreSegment } from '../../../lib/datalib/calculateData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  gradient,
)

/**
 * The basic component of bar chart
 */
export function BarChart({
  series,
  labelName,
  dataName = '',
  minValue = 0,
  maxValue,
  chartWidth,
  chartHeight,
  marginRight,
  marginLeft,
  marginTop = '',
  paddingRight = '',
  paddingLeft = '',
  chartBcColor = '',
  maxBarThickness = '65',
  barColor,
  ticks = [],
  ticksCallback = () => null,
  tooltipsCallback,
  graphType,
}) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: dataName,
        font: { size: '25' },
      },
      tooltip: {
        callbacks: {
          label: tooltipsCallback,
        },
      },
    },
    scales: {
      x: {
        grid: {
          drawTicks: false,
        },
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        max: maxValue,
        beginAtZero: true,
        position: 'right', // `axis` is determined by the position as `'y'`
        afterBuildTicks: (axis) =>
          (axis.ticks = ticks.map((v) => ({
            value: v,
          }))),
        ticks: {
          callback: () => '',
          font: { size: 14 },
        },
        grid: {
          drawTicks: true,
          lineWidth: 1,
          color: '#000',
          z: 10,
        },
        border: { color: '#000' },
      },
      y2: {
        max: maxValue,
        ticks: {
          stepSize: 5,
          autoSkip: false,
          font: { size: 12 },
          color: '#192841',
          callback: ticksCallback,
          minRotation: 30,
        },
        grid: {
          drawTicks: false,
          display: graphType === GraphType.depression ? false : true,
        },
        border: { color: '#000' },
        afterFit: function (scaleInstance) {
          scaleInstance.width = 50 // sets the width to 100px
        },
      },
      y3: {
        max: maxValue,
        border: { display: false },
        ticks: {
          stepSize: 5,
          callback: function () {
            return ''
          },
        },
        grid: {
          drawTicks: false,
          display: graphType === GraphType.depression ? false : true,
        },
      },
    },
  }

  const getValues = (series) => {
    let vArray = []
    series.forEach((i) => {
      vArray.push(i.value)
    })
    return vArray
  }

  const data = {
    labels: labelName,
    datasets: [
      {
        label: dataName,
        data: getValues(series),
        maxBarThickness: maxBarThickness,
        backgroundColor: barColor,
        // Dont remove here for now
        // gradient: {
        //   backgroundColor: {
        //     axis: 'y',
        //     colors: {
        //       0: '#FFDDDD',
        //       [maxValue]: '#DDA500',
        //     },
        //   },
        //   borderColor: {
        //     axis: 'y',
        //     colors: {
        //       0: '#808080',
        //       [maxValue]: '#808080',
        //     },
        //   },
        // },
      },
    ],
  }

  return (
    <div
      className="barChartDiv"
      style={{
        width: chartWidth,
        height: chartHeight,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
      }}
    >
      <Bar
        options={options}
        key={JSON.stringify(data)}
        data={data}
        style={{
          backgroundColor: chartBcColor,
          paddingRight: paddingRight,
          paddingLeft: paddingLeft,
        }}
      />
    </div>
  )
}

// Note: data and label name are array
const normalize = (data, maxValue) => {
  return maxValue !== 0 ? data.map((d) => (100 * d) / maxValue) : 0
}

export const showBarChart = ({
  medicalData,
  labelName,
  dataName,
  minValue,
  maxValues,
  chartWidth = '450px',
  chartHeight = '450px',
  marginRight,
  marginLeft,
  marginTop,
  paddingRight,
  paddingLeft,
  chartBcColor,
  yAxisPosition,
  maxBarThickness,
  scales,
  ticks = [],
  ticksCallback = () => {},
  graphType,
}) => {
  return (
    <BarChart
      series={medicalData}
      labelName={labelName}
      dataName={dataName}
      minValue={minValue}
      maxValue={100}
      chartWidth={chartWidth}
      chartHeight={chartHeight}
      chartBcColor={chartBcColor}
      yAxisPosition={yAxisPosition}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      paddingRight={paddingRight}
      paddingLeft={paddingLeft}
      maxBarThickness={maxBarThickness}
      barColor={(context) => {
        const index = context.dataIndex
        const value = context.dataset.data[index]
        if (value === null || value === undefined) {
          return scales[0].color
        } else {
          const rgb = getScoreSegment(
            (value / 100) * maxValues[index],
            scales[index],
          ).color
          return rgb
        }
      }}
      ticks={normalize(ticks, maxValues[0]).concat([100])}
      ticksCallback={ticksCallback}
      tooltipsCallback={
        (item) =>
          Math.floor(item.parsed.y * 10) / 10 +
          '%' +
          ' of ' +
          maxValues[item.dataIndex]
        // Math.round(item.parsed.y * maxValues[item.dataIndex]) / 100
      }
      graphType={graphType}
    />
  )
}
