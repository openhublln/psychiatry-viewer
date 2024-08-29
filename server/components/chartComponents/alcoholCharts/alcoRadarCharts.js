import { RadarChart } from '../basicCharts/radarChart'
import { DataColumns, RadarDataColors } from '../../../models/dataset'
import { getDataSetByDataNames } from '../../../lib/datalib/parseData'
import {
  showGraph,
  transparentize,
} from '../../componentsUtils/visualizationGraph'
import { RadarLineChart } from '../basicCharts/radarLineChart'
import { Space } from 'antd'

/**
 * The evolution change for the alcool resume
 * @param {Object} medicalData - The medical data
 * @param {Object} temps - The time steps in array
 * @param {boolean} doShowWarning - control the display of the warning message
 * @returns The radar graph
 */
export const showAlcoResumeEvolutionsRadar = ({
  medicalData,
  temps,
  doShowWarning,
}) => {
  const dataNames = [
    DataColumns.phq9.columns[0],
    DataColumns.gad7.columns[0],
    DataColumns.isi.columns[0],
    DataColumns.ocds.columns[2],
    DataColumns.gse.columns[0],
  ]
  console.log("MEDICAL DATA", medicalData)
  console.log("DATA NAMES", dataNames)
  let firstData = getDataSetByDataNames(medicalData, temps[0], dataNames)
  let secondData = getDataSetByDataNames(medicalData, temps[1], dataNames)
  console.log("FIRST DATA DATASET", firstData)
  console.log("SECOND DATA DATASET", secondData)
  for (let i = 0; i < firstData.dataSet.length; i++) {
    switch (i) {
      case 0:
        firstData.dataSet[i] = firstData.dataSet[i] / 2.7
        break
      case 1:
        firstData.dataSet[i] = firstData.dataSet[i] / 2.1
        break
      case 2:
        firstData.dataSet[i] = firstData.dataSet[i] / 2.8
        break
      case 3:
        firstData.dataSet[i] = firstData.dataSet[i] / 3.2
        break
      case 4:
        firstData.dataSet[i] = (((firstData.dataSet[i] - 10) * 100) / 30) / 10
        break
      default:
        break
    }
  }
  for (let i = 0; i < secondData.dataSet.length; i++) {
    switch (i) {
      case 0:
        secondData.dataSet[i] = secondData.dataSet[i] / 2.7
        break
      case 1:
        secondData.dataSet[i] = secondData.dataSet[i] / 2.1
        break
      case 2:
        secondData.dataSet[i] = secondData.dataSet[i] / 2.8
        break
      case 3:
        secondData.dataSet[i] = secondData.dataSet[i] / 3.2
        break
      case 4:
        secondData.dataSet[i] = (((secondData.dataSet[i] - 10) * 100) / 30) / 10
        break
      default:
        break
    }
  }

  const labels = [
    'Dépression',
    'Anxiété',
    'Insomnie',
    'Craving',
    'Auto-efficacité',
  ]

  const timeDataSet = [
    {
      time: temps[0],
      data: firstData.dataSet,
      borderColor: RadarDataColors.blueRGBString,
      backgroundColor: transparentize(RadarDataColors.blueRGBString, 0.8),
    },
    {
      time: temps[1],
      data: secondData.dataSet,
      borderColor: RadarDataColors.orangeRGBString,
      backgroundColor: transparentize(RadarDataColors.orangeRGBString, 0.8),
    },
  ]

  const graph = (
    <Space direction="horizontal">
      <h2 style={{ color: 'rgba(0, 0, 255, 1)', paddingTop: '230px' }}>
        Avant
      </h2>
      <div>
        {RadarChart({
          dataSet: timeDataSet,
          scorelabels: labels,
          dataName: 'Avant et après le sevrage',
          maxValue: 10,
          fill: false,
        })}
      </div>
      <h2 style={{ color: 'rgba(255, 128, 0, 1)', paddingTop: '230px' }}>
        Après
      </h2>
    </Space>
  )

  return showGraph({
    missingGeneralColumn: [
      { time: temps[0], missingCols: firstData.missingDataCol },
      { time: temps[1], missingCols: secondData.missingDataCol },
    ],
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * The force and fragility for alcool data
 * @returns The Radar line chart
 */
export const showAlcoForceFragilityRadar = ({
  medicalData,
  time,
  doShowWarning,
}) => {
  const fragilityDataNamesT1 = [
    DataColumns.cerq.columns[1],
  ]
  const fragilityDataNamesT2 = [
    DataColumns.phq9.columns[0],
    DataColumns.gad7.columns[0],
    DataColumns.isi.columns[0],
    DataColumns.ocds.columns[2],
    DataColumns.bearni.total,
  ]

  const forceDataNamesT1 = [
    DataColumns.cerq.columns[0],
    DataColumns.ssq6.columns[1],
    DataColumns.whoQolBref.resultColumns[0],
    DataColumns.whoQolBref.resultColumns[3],
  ]
  const forceDataNamesT2 = [
    DataColumns.gse.columns[0],
    DataColumns.wai.columns[0],
  ]

  // Get fragility data
  const fragilityDataT1 = getDataSetByDataNames(
    medicalData,
    time[0],
    fragilityDataNamesT1,
  )
  const fragilityDataT2 = getDataSetByDataNames(
    medicalData,
    time[1],
    fragilityDataNamesT2,
  )
  // Force data
  const forceDataT1 = getDataSetByDataNames(
    medicalData,
    time[0],
    forceDataNamesT1,
  )
  const forceDataT2 = getDataSetByDataNames(
    medicalData,
    time[1],
    forceDataNamesT2,
  )
  const fragilityData = [...fragilityDataT1.dataSet, ...fragilityDataT2.dataSet]
  const forceData = [...forceDataT1.dataSet, ...forceDataT2.dataSet]

  const modifiedData = [
    (fragilityData[1] / 27) * 10, // PHQ-9
    (fragilityData[2] / 21) * 10, // GAD-7
    (fragilityData[3] / 28) * 10, // ISI
    (fragilityData[4] / 32) * 10, // OCDS
    (100 - ((fragilityData[5] / 30) * 100)) / 10, // Bearni
    (fragilityData[0] / 80) * 10, // CERQ 1

    (forceData[0] / 100) * 10, // CERQ
    (((forceData[4] - 10) * 100) / 30) / 10, // GSE
    (forceData[1] / 36) * 10, // SSQ-6
    (((forceData[5] - 12) * 100) / 72) / 10, // WAI
    forceData[2] / 10, // WHO-5 (déjà en %)
    forceData[3] / 10, // WHO-10 (déjà en %)
  ]

  // Check the missing data
  let missingCols = []
  if (fragilityDataT1.missingDataCol.length > 0) {
    missingCols.push(fragilityDataT1.missingDataCol)
  }
  if (fragilityDataT2.missingDataCol.length > 0) {
    missingCols.push(fragilityDataT2.missingDataCol)
  }
  if (fragilityDataT1.missingDataCol.length > 0) {
    missingCols.push(fragilityDataT1.missingDataCol)
  }
  if (fragilityDataT2.missingDataCol.length > 0) {
    missingCols.push(fragilityDataT2.missingDataCol)
  }

  const labels = [
    'Dépression',
    'Anxiété',
    'Insomnie',
    'Craving',
    'Atteinte neuro-cognitive',
    ['Régulation non-adaptative', 'des émotions'],
    //----------------------------------------
    ['Régulation adaptative', 'des émotions'],
    'Auto-efficacité',
    ['Satisfaction', 'du soutien'],
    'Alliance thérapeutique',
    'Santé physique',
    'Environnement',
  ]

  const rightColor = RadarDataColors.greenRGBString
  const leftColor = RadarDataColors.redRGBString

  const colors = [
    leftColor,
    leftColor,
    leftColor,
    leftColor,
    leftColor,
    leftColor,
    rightColor,
    rightColor,
    rightColor,
    rightColor,
    rightColor,
    rightColor,
  ]

  const timeDataSet = [{ time: time, data: modifiedData }]

  const graph = (
    <Space direction="horizontal">
      <h2 style={{ color: rightColor, marginTop: '230px' }}>
        Forces
      </h2>
      <div>
        {RadarLineChart({
          dataSet: timeDataSet,
          scorelabels: labels,
          dataName: 'Les forces et fragilités',
          minValue: 0,
          maxValue: 10,
          colors: colors,
          chartWidth: '550px',
          chartHeight: '530px',
          isDivide: true,
          changeStartAngle: true,
        })}
      </div>
      <h2 style={{ color: leftColor, marginTop: '230px' }}>
        Fragilités
      </h2>
    </Space>
  )

  const missingGeneralColumn = [
    {
      time: time[0],
      missingCols: missingCols,
    },
  ]

  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}
