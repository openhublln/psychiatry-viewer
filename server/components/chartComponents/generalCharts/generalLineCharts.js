import { getDataByName } from '../../../lib/datalib/parseData'
import { LineChart } from '../basicCharts/lineChart'
import {
  DataColumns,
  NoScoreSegmentColors,
  ScoreSegmentColors,
  ScoreSegmentLabels,
} from '../../../models/dataset'
import { showGraph, emptyValue } from '../../componentsUtils/visualizationGraph'

/**
 * @returns Display the depression evoluation in line chart
 */
export const showInterDepressionEvolutionLine = ({
  medicalData,
  temps,
  dataName,
  doShowWarning,
}) => {
  let datasets = []
  let currentColName = ''
  let missingTotalColumn = []
  let labels = []
  let tData = []
  for (let i = 0; i < temps.length; i++) {
    let missingCols = []
    for (let c = 0; c < DataColumns.phq9.columns.length; c++) {
      i === 0
        ? labels.push("À l'admission")
        : labels.push(["En fin d'hospitalisation"])
      currentColName = DataColumns.phq9.columns[c].trim()
      const value = getDataByName(
        medicalData,
        DataColumns.phq9.columns[c].trim(),
        temps[i],
        medicalData.name,
      )
      tData.push(value)
      if (emptyValue(value)) {
        missingCols.push(currentColName)
      }
    }
    missingTotalColumn.push({ time: temps[i], missingCols: missingCols })
  }

  const td = {
    label: currentColName,
    data: tData,
    borderColor: NoScoreSegmentColors.blueRGBString,
  }
  datasets.push(td)

  const data = {
    labels: labels,
    datasets: datasets,
  }
  const graph = (
    <LineChart
      dataSet={data}
      maxValue={30}
      dataName={dataName}
      ticksCallback={function (value) {
        switch (value) {
          case 2:
            return ScoreSegmentLabels.absente
          case 8:
            return ScoreSegmentLabels.léger
          case 12:
            return ScoreSegmentLabels.modéré
          case 18:
            return ScoreSegmentLabels.modsévère
          case 24:
            return ScoreSegmentLabels.sévère
          default:
            break
        }
      }}
      y1StepSize={2}
    />
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * @returns Display the isomnie data line chart
 */
export const showIsomnieLine = ({ medicalData, temps, dataName, doShowWarning }) => {
  let datasets = []
  let currentColName = ''
  let missingTotalColumn = []
  let labels = []
  let tData = []
  for (let i = 0; i < temps.length; i++) {
    let missingCols = []
    for (let c = 0; c < DataColumns.isi.columns.length; c++) {
      i === 0
        ? labels.push("à l'admission")
        : labels.push(["En fin d'hospitalisation"])
      currentColName = DataColumns.isi.columns[c].trim()
      const value = getDataByName(
        medicalData,
        DataColumns.isi.columns[c].trim(),
        temps[i],
        medicalData.name,
      )
      tData.push(value)
      if (emptyValue(value)) {
        missingCols.push(DataColumns.isi.columns[c].trim())
      }
    }
    missingTotalColumn.push({ time: temps[i], missingCols: missingCols })    
  }

  const td = {
    label: currentColName,
    data: tData,
    borderColor: NoScoreSegmentColors.blueRGBString,
  }
  datasets.push(td)

  const data = {
    labels: labels,
    datasets: datasets,
  }

  const graph = (
    <LineChart
      dataSet={data}
      maxValue={30}
      dataName={dataName}
      ticksCallback={function (value) {
        switch (value) {
          case 6:
            return ScoreSegmentLabels.absente
          case 12:
            return ScoreSegmentLabels.léger
          case 18:
            return ScoreSegmentLabels.modéré
          case 24:
            return ScoreSegmentLabels.sévère
          default:
            break
        }
      }}
      y1StepSize={6}
    />
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * @returns Display the evoluation change in line chart
 */
export const showDisplayEvolutionLine = ({
  medicalData,
  temps,
  dataName,
  dataColumns,
  maxValue,
  ticksCallback,
  y1StepSize,
  colorScale,
  normalized = false,
  minNormalized = 0,
  maxNormalized = 0,
  doShowWarning,
}) => {
  let datasets = []
  let missingGeneralColumn = []
  let labels = []
  let tData = []
  for (let i = 0; i <= 1; i++) {
    let missingCols = []
    for (let c = 0; c < dataColumns.length; c++) {
      i === 0
        ? labels.push("À l'admission")
        : labels.push(["En fin d'hospitalisation"])
      let value = getDataByName(
        medicalData,
        dataColumns[c].trim(),
        temps[i],
        medicalData.name,
      )
      if(normalized) {
        value = ((value - minNormalized) / (maxNormalized - 10)) * 100
      }
      tData.push(value)
      if (emptyValue(value)) {
        missingCols.push(dataColumns[c].trim())
      }
    }
    missingGeneralColumn.push({ time: temps[i], missingCols: missingCols })
  }
  
  let LineColor = NoScoreSegmentColors.blueRGBString
  if(colorScale != null && colorScale.length > 0)
  {
    var i = 0
    while (tData[1] > colorScale[i].threshold && i < colorScale.length - 1) {
      i++
    }
    LineColor = colorScale[i].color
  }

  const td = {
    label: "Évolution",
    data: tData,
    borderColor: LineColor,
  }
  datasets.push(td)
  const data = {
    labels: labels,
    datasets: datasets,
  }

  const graph = (
    <LineChart
      dataSet={data}
      maxValue={maxValue}
      dataName={dataName}
      ticksCallback={ticksCallback}
      y1StepSize={y1StepSize}
    />
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}
