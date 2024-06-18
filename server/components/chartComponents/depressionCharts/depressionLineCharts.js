import { LineChart } from '../basicCharts/lineChart'
import {
  DataColumns,
  NoScoreSegmentColors,
  ScoreSegmentLabels,
  LineDataColors,
} from '../../../models/dataset'
import { getDataByName } from '../../../lib/datalib/parseData'
import { emptyValue, showGraph } from '../../componentsUtils/visualizationGraph'

/**
 * Display the hypersomnolence data
 * @returns The line chart
 */
export const showHypersomnolenceLine = ({ medicalData, temps, dataName, doShowWarning }) => {
  let datasets = []
  let labels = []
  let tData = []
  let missingTotalColumn = []
  for (let i = 0; i < temps.length; i++) {
    let missingCols = []
    for (let c = 0; c < DataColumns.hsi.columns.length; c++) {
      // labels.push(temps[i])
      i === 0
        ? labels.push("À l'admission")
        : labels.push(["En fin d'hospitalisation"])
      const value = getDataByName(
        medicalData,
        DataColumns.hsi.columns[c].trim(),
        temps[i],
        medicalData.name,
      )

      tData.push(value)

      if (emptyValue(value)) {
        missingCols.push(DataColumns.hsi.columns[c].trim())
      }
    }
    missingTotalColumn.push({ time: temps[i], missingCols: missingCols })
  }
  const td = {
    label: DataColumns.hsi.columns[0],
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
      maxValue={36}
      dataName={dataName}
      ticksCallback={function (value) {
        switch (value) {
          case 8:
            return ScoreSegmentLabels.absente
          case 24:
            return ScoreSegmentLabels.presente
          default:
            break
        }
      }}
      y1StepSize={8}
    />
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * Display the anxiety data
 * @param {Object} medicalData - The retrieved medical data
 * @param {Object} temps - The time steps in array
 * @param {String} dataName - The displayed data name
 * @returns The line chart
 */
export const showAnxietyLine = ({ medicalData, temps, dataName, doShowWarning }) => {
  let datasets = []
  let missingTotalColumn = []
  let labels = []
  let tData = []
  for (let i = 0; i < temps.length; i++) {
    let missingCols = []
    for (let c = 0; c < DataColumns.gad7.columns.length; c++) {
      // labels.push(temps[i])
      i === 0
      ? labels.push("À l'admission")
      : labels.push(["En fin d'hospitalisation"])
      const value = getDataByName(
        medicalData,
        DataColumns.gad7.columns[c].trim(),
        temps[i],
        medicalData.name,
      )
      tData.push(value)
      if (emptyValue(value)) {
        missingCols.push(DataColumns.gad7.columns[c].trim())
      }
    }
    missingTotalColumn.push({ time: temps[i], missingCols: missingCols })

    // const td = {
    //   label: DataColumns.gad7.columns[0],
    //   data: tData,
    //   borderColor: NoScoreSegmentColors.blueRGBString,
    // }
    // datasets.push(td)
  }
  const td = {
    label: DataColumns.gad7.columns[0],
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
      maxValue={21}
      dataName={dataName}
      ticksCallback={function (value) {
        switch (value) {
          case 4:
            return ScoreSegmentLabels.absente
          case 8:
            return ScoreSegmentLabels.léger
          case 12:
            return ScoreSegmentLabels.modéré
          case 16:
            return ScoreSegmentLabels.sévère
          default:
            break
        }
      }}
      y1StepSize={4}
    />
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * Display the evolution change of reactivity of depression
 * @param {Object} medicalData - the medical data
 * @param {Object} temps - The time steps in array
 * @returns The line chart
 */
export const showReactiviteEmoEvolutionLine = ({ medicalData, temps, doShowWarning }) => {
  let dataSets = []
  let missingGeneralColumn = []
  let missingColsT1 = []
  let missingColsT2 = []
  for (let c = 0; c < DataColumns.mathyS.columns.length; c++) {
    const valueT1 = getDataByName(
      medicalData,
      DataColumns.mathyS.columns[c].trim(),
      temps[0],
      medicalData.name,
    )
    if (emptyValue(valueT1)) {
      missingColsT1.push(DataColumns.mathyS.columns[c].trim())
    }
    const valueT2 = getDataByName(
      medicalData,
      DataColumns.mathyS.columns[c].trim(),
      temps[1],
      medicalData.name,
    )
    if (emptyValue(valueT2)) {
      missingColsT2.push(DataColumns.mathyS.columns[c].trim())
    }

    dataSets.push({
      label: DataColumns.mathyS.columns[c],
      data: [valueT1, valueT2],
      borderColor: LineDataColors[c],
    })
  }

  if (missingColsT1 && missingColsT1.length > 0) {
    missingGeneralColumn.push({
      time: temps[0],
      missingCols: missingColsT1,
    })
  }

  if (missingColsT2 && missingColsT2.length > 0) {
    missingGeneralColumn.push({
      time: temps[1],
      missingCols: missingColsT2,
    })
  }

  const data = {
    labels: [temps[0], temps[1]],
    datasets: dataSets,
  }

  const graph = (
    <LineChart
      dataSet={data}
      maxValue={200}
      chartWidth={850}
      dataName="Réactivité émotionnelle (MAThyS)"
      ticksCallback={function (value) {
        switch (value) {
          case 90:
            return ScoreSegmentLabels.inhition
          case 110:
            return ScoreSegmentLabels.etatHabituel
          case 120:
            return ScoreSegmentLabels.activation
          default:
            break
        }
      }}
      y1StepSize={5}
    />
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}
