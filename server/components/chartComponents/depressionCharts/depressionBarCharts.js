import { showBarChart } from '../basicCharts/barChart'
import {
  DataColumns,
  ScoreSegmentColors,
  ScoreSegmentLabels,
  SingleBarColors,
  GraphType,
} from '../../../models/dataset'
import {
  getMissingDataColumn,
  showGraph,
} from '../../componentsUtils/visualizationGraph'

import { getNormalizedValue } from '../../../lib/datalib/calculateData'

export const normalize = (data, maxValue) => {
  return maxValue !== 0 ? data.map((d) => (100 * d) / maxValue) : 0
}

/**
 * Display intesite derpression data
 * @returns Bar chart
 */
export const showInterDepressionBar = ({ medicalData, time, doShowWarning }) => {
  let data = DataColumns.phq9.columns.map((cname) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      medicalData.name,
      27,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingTotalColmn = getMissingDataColumn(data, time)
  const graph = showBarChart({
    medicalData: data,
    labelName: [""],
    dataName: 'Dépression (PHQ9)',
    chartWidth: '200px',
    maxValues: [27],
    ticks: [0, 4.5, 9.5, 14.5, 19.5],
    scales: [
      [
        {
          threshold: 4.5,
          color: ScoreSegmentColors.absenteRGBString,
        },
        {
          threshold: 9.5,
          color: ScoreSegmentColors.légerRGBString,
        },
        {
          threshold: 14.5,
          color: ScoreSegmentColors.modéréRGBString,
        },
        {
          threshold: 19.5,
          color: ScoreSegmentColors.modsévèreRGBString,
        },
        {
          threshold: 27,
          color: ScoreSegmentColors.sévèreRGBString,
        },
      ],
    ],
    ticksCallback: function (value) {
      switch (value) {
        case 10:
          return ScoreSegmentLabels.absente
        case 25:
          return ScoreSegmentLabels.léger
        case 45:
          return ScoreSegmentLabels.modéré
        case 65:
          return ScoreSegmentLabels.modsévèreSeperated
        case 85:
          return ScoreSegmentLabels.sévère
        default:
          break
      }
    },
    graphType: GraphType.depression,
  })
  return showGraph({
    missingTotalColumn: missingTotalColmn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * Display Isomnie bar chart
 */
export const showIsomnieBar = ({ medicalData, time, doShowWarning }) => {
  let data = DataColumns.isi.columns.map((cname) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      medicalData.name,
      28,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingTotalColmn = getMissingDataColumn(data, time)
  const graph = showBarChart({
    medicalData: data,
    labelName: [""],
    dataName: 'Insomnie (ISI)',
    chartWidth: '200px',
    maxValues: [28],
    ticks: [0, 7.5, 14.5, 21.5],
    scales: [
      [
        {
          threshold: 7.5,
          color: ScoreSegmentColors.absenteRGBString,
        },
        {
          threshold: 14.5,
          color: ScoreSegmentColors.légerRGBString,
        },
        {
          threshold: 21.5,
          color: ScoreSegmentColors.modéréRGBString,
        },
        {
          threshold: 28,
          color: ScoreSegmentColors.sévèreRGBString,
        },
      ],
    ],
    ticksCallback: function (value) {
      switch (value) {
        case 15:
          return ScoreSegmentLabels.absente
        case 40:
          return ScoreSegmentLabels.léger
        case 65:
          return ScoreSegmentLabels.modéré
        case 90:
          return ScoreSegmentLabels.sévère
        default:
          break
      }
    },
    graphType: GraphType.depression,
  })
  return showGraph({
    missingTotalColumn: missingTotalColmn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 *
 * @returns The Hypersomnolence (HSI) bar chart
 */
export const showHypersomnolenceBar = ({ medicalData, time, doShowWarning }) => {
  let data = DataColumns.hsi.columns.map((cname) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      medicalData.name,
      36,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingTotalColmn = getMissingDataColumn(data, time)
  const graph = showBarChart({
    medicalData: data,
    labelName: [""],
    dataName: ['Hypersomnolence', '(HSI)'],
    chartWidth: '200px',
    maxValues: [28],
    ticks: [0, 9.5],
    scales: [
      [
        {
          threshold: 9.5,
          color: ScoreSegmentColors.absenteRGBString,
        },
        {
          threshold: 28,
          color: ScoreSegmentColors.presenteRGBString,
        },
      ],
    ],
    ticksCallback: function (value) {
      switch (value) {
        case 25:
          return ScoreSegmentLabels.absente
        case 40:
          return ScoreSegmentLabels.presente
        default:
          return null
      }
    },
    graphType: GraphType.depression,
  })
  return showGraph({
    missingTotalColumn: missingTotalColmn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * @returns Display bar chart for the reseau social of depression
 */
export const showDepressionReseauSocialBar = ({ medicalData, time, doShowWarning }) => {
  const maxValues = [54, 36]
  let data = DataColumns.ssq6.columns.map((cname, index) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      medicalData.name,
      maxValues[index],
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingGeneralColumn = getMissingDataColumn(data, time)
  const graph = showBarChart({
    medicalData: data,
    labelName: DataColumns.ssq6.name,
    dataName: 'Le soutien social (SSQ6)',
    maxValues: maxValues,
    chartWidth: '300px',
    scales: [
      [
        {
          threshold: 54,
          color: SingleBarColors.brightBlueRGBString,
        },
      ],
      [
        {
          threshold: 36,
          color: SingleBarColors.pastelOrangeRGBString,
        },
      ],
    ],
    graphType: GraphType.depression,
  })
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * @returns Display bar chart of Réactivité émotionnelle (MAThyS)
 */
export const showReactivityEmotionelleBar = ({ medicalData, time, doShowWarning }) => {
  const colors = [
    {
      threshold: 91.5,
      color: ScoreSegmentColors.absenteRGBString,
    },
    {
      threshold: 109.5,
      color: ScoreSegmentColors.légerRGBString,
    },
    {
      threshold: 200,
      color: ScoreSegmentColors.sévèreRGBString,
    },
  ]
  const scales = [colors, colors, colors, colors, colors]

  let data = DataColumns.mathyS.columns.map((cname) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      medicalData.name,
      200,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingGeneralColumn = getMissingDataColumn(data, time)
  const graph = showBarChart({
    medicalData: data,
    labelName: DataColumns.mathyS.name,
    dataName: 'Réactivité émotionnelle (MAThyS)',
    maxValues: [200, 200, 200, 200, 200],
    chartWidth: '600px',
    ticks: [0, 91.5, 109.5],
    scales: scales,
    ticksCallback: function (value) {
      switch (value) {
        case 35:
          return ScoreSegmentLabels.inhition
        case 50:
          return ScoreSegmentLabels.etatHabituel
        case 65:
          return ScoreSegmentLabels.activation
        default:
          break
      }
    },
    graphType: GraphType.depression,
  })
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}
