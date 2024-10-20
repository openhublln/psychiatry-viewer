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
  isHorizontal = false,
  drawGrid = false,
  stepSize = 10,
  isFloating = false,
}) {
  const xTicksHorizontal =  {
    font: { size: 12 },
    stepSize: 5,
    autoSkip: false,
    callback: ticksCallback,
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: isHorizontal ? 'y' : 'x',
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
        max: maxValue,
        grid: {
          drawTicks: isHorizontal,
          drawOnChartArea: isHorizontal,
        },
        ticks: isHorizontal ? xTicksHorizontal : {
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
          callback: isHorizontal ? null : () => '',
          font: { size: 14 },
        },
        grid: {
          drawTicks: false,
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
          callback: isHorizontal ? () => '' : ticksCallback,
          minRotation: 30,
        },
        grid: {
          drawTicks: false,
          display: (!isHorizontal && drawGrid) ? true : false//graphType === GraphType.depression ? false : true,
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
          stepSize: stepSize,
          callback: function () {
            return ''
          },
        },
        grid: {
          drawTicks: false,
          display: (!isHorizontal && drawGrid) ? true : false,//graphType === GraphType.depression ? false : true,
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
        data: isFloating ? series : getValues(series),
        maxBarThickness: maxBarThickness,
        backgroundColor: barColor,
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
          width: chartWidth,
          height: chartHeight,
          backgroundColor: chartBcColor,
          paddingRight: paddingRight,
          paddingLeft: paddingLeft,
        }}
        className='react-chartjs-2_chart-instance'
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
  isHorizontal = false,
  drawGrid = false,
  stepSize = 10,
  isFloating = false,
  tooltipForcedValue = null,
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
        const value = isFloating ? context.dataset.data[index][1] : context.dataset.data[index]
        if (value === null || value === undefined) {
          return scales[0].color
        } else {
          const rgb = getScoreSegment(
            isFloating ? value :(value / 100) * maxValues[index],
            scales[index],
          ).color
          return rgb
        }
      }}
      ticks={normalize(ticks, maxValues[0]).concat([100])}
      ticksCallback={ticksCallback}
      tooltipsCallback={
        (item) => {
          if(tooltipForcedValue != null) return tooltipForcedValue
          let value = isHorizontal ? item.parsed.x : item.parsed.y

         return Math.floor(value * 10) / 10 +
          '%' +
          ' of ' +
          maxValues[item.dataIndex]
        }
      }
      graphType={graphType}
      isHorizontal = {isHorizontal}
      drawGrid = {drawGrid}
      stepSize={stepSize}
      isFloating={isFloating}
    />
  )
}
