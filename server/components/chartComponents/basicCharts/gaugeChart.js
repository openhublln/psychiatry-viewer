import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'
import {
  ScoreSegmentLabels,
  GaugeSpecialColors,
  ScoreSegmentColors,
} from '../../../models/dataset'
import Styles from '../chartcomponents.module.css'

const getSegment = (label, position) => {
  return {
    text: label,
    position: position,
    color: '#555',
    fontSize: '12px',
  }
}

const createChartSegments = (scoreLabels) => {
  let segments = []
  let seg = null
  scoreLabels.forEach((scl) => {
    if (scl === ScoreSegmentLabels.absente) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.presente) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.léger) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.modéré) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.modsévère) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.sévère) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.total) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.unknow) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.adaptatifTotal) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.nonAdaptatifTotal) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.quality) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.quantity) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.nothing) {
      seg = getSegment(scl, 'OUTSIDE')
    } else if (scl === ScoreSegmentLabels.populationgeneral) {
      seg = getSegment(scl, 'INSIDE')
    }
    if (seg) {
      segments.push(seg)
    }
  })
  return segments
}

const getSegmentColors = (segNumber, withColor, index) => {
  if (segNumber === 5) {
    return withColor
      ? [
          ScoreSegmentColors.absenteRGBString,
          ScoreSegmentColors.légerRGBString,
          ScoreSegmentColors.modsévèreRGBString,
          ScoreSegmentColors.modéréRGBString,
          ScoreSegmentColors.sévèreRGBString,
        ]
      : index === 0
        ? [
            GaugeSpecialColors.softCyanRGBString,
            GaugeSpecialColors.softCyanRGBString,
            GaugeSpecialColors.softCyanRGBString,
            GaugeSpecialColors.softCyanRGBString,
            GaugeSpecialColors.softCyanRGBString,
          ]
        : [
            GaugeSpecialColors.lightGreenRGBString,
            GaugeSpecialColors.lightGreenRGBString,
            GaugeSpecialColors.lightGreenRGBString,
            GaugeSpecialColors.lightGreenRGBString,
            GaugeSpecialColors.lightGreenRGBString,
          ]
  } else {
    return withColor
      ? [
          ScoreSegmentColors.absenteRGBString,
          ScoreSegmentColors.légerRGBString,
          ScoreSegmentColors.modéréRGBString,
          ScoreSegmentColors.sévèreRGBString,
        ]
      : index === 0
        ? [
            GaugeSpecialColors.softCyanRGBString,
            GaugeSpecialColors.softCyanRGBString,
            GaugeSpecialColors.softCyanRGBString,
            GaugeSpecialColors.softCyanRGBString,
          ]
        : [
            GaugeSpecialColors.lightGreenRGBString,
            GaugeSpecialColors.lightGreenRGBString,
            GaugeSpecialColors.lightGreenRGBString,
            GaugeSpecialColors.lightGreenRGBString,
          ]
  }
}

export function GaugeChart({
  medicalData,
  scoreLabels,
  segmentStops,
  dataName,
  maxValue,
  withColor,
  width = 390,
  height = 390,
  index = 0,
  segmentColors = null,
  shwoScoreInPrct = false,
}) {
  var ValueText = `${dataName}: ${Math.round(medicalData * 100) / 100}`
  if (shwoScoreInPrct){
    ValueText = `${dataName}: ${Math.round((medicalData / maxValue) * 100)} %`
  }
  return (
    <div
      className={Styles.gaugeChartDiv}
      style={{
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ReactSpeedometer
        key={JSON.stringify(medicalData)}
        width={width}
        heigh={height}
        needleHeightRatio={0.7}
        value={medicalData}
        maxSegmentLabels={scoreLabels.length}
        segments={scoreLabels.length}
        currentValueText={ValueText}
        customSegmentLabels={createChartSegments(scoreLabels)}
        segmentColors={
          segmentColors
            ? segmentColors
            : getSegmentColors(scoreLabels.length, withColor, index)
        }
        ringWidth={47}
        minValue={0}
        maxValue={maxValue}
        customSegmentStops={segmentStops}
        needleColor={'#000'}
        textColor={'#000'}
      />
    </div>
  )
}
