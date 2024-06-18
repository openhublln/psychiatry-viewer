import { getDataByName } from '../../../lib/datalib/parseData'
import { RadarChart } from '../basicCharts/radarChart'
import { DataColumns, RadarDataColors } from '../../../models/dataset'
import { RadarLineChart } from '../basicCharts/radarLineChart'
import { showGraph, emptyValue } from '../../componentsUtils/visualizationGraph'
import { transparentize } from '../../componentsUtils/visualizationGraph'

/**
 * @returns Display the impulsivity data in Radar chart
 */
export const showImpulsivityRadar = ({ medicalData, temps, graphType, doShowWarning }) => {
  let timeDataSet = []
  let missingGeneralColumn = []
  let missingCols = []
  let values = []
  DataColumns.uppsp20.columns.forEach((dataColumn) => {
    const value = getDataByName(
      medicalData,
      dataColumn,
      temps[0],
      medicalData.name,
    )
    values.push(value)
    if (emptyValue(value)) {
      missingCols.push(dataColumn)
    }
  })

  missingGeneralColumn.push({
    time: temps[0],
    missingCols: missingCols,
  })

  const timeData = {
    time: temps[0],
    data: values,
    borderColor: RadarDataColors.greenRGBString,
    backgroundColor: transparentize(RadarDataColors.greenRGBString, 0.8),
  }
  timeDataSet.push(timeData)
  const graph = RadarChart({
    dataSet: timeDataSet,
    scorelabels: DataColumns.uppsp20.name,
    dataName: 'Impulsivité (UPPS-P-20)',
    maxValue: 16,
    graphType: graphType,
  })
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * @returns Display the infinie familie data in Radar chart
 */
export const showInfFamilieRadar = ({ medicalData, temps, dataName, doShowWarning }) => {
  let missingGeneralColumn = []
  let timeDataSet = []
  for (let i = 0; i < temps.length; i++) {
    let values = []
    let missingCols = []
    DataColumns.ctq.resultColumns.forEach((cname) => {
      const value = getDataByName(
        medicalData,
        cname,
        temps[i],
        medicalData.name,
      )
      values.push(value)
      if (emptyValue(value)) {
        missingCols.push(cname)
      }
    })

    const timeData = {
      time: temps[i],
      data: values,
    }
    timeDataSet.push(timeData)

    missingGeneralColumn.push({
      time: temps[i],
      missingCols: missingCols,
    })
  }

  const graph = RadarLineChart({
    dataSet: timeDataSet,
    scorelabels: DataColumns.ctq.name,
    dataName: dataName,
    colors: [
      RadarDataColors.blueRGBString,
      RadarDataColors.blueRGBString,
      RadarDataColors.blueRGBString,
      RadarDataColors.blueRGBString,
      RadarDataColors.blueRGBString,
    ],
    isDivide: false,
    changeStartAngle: false,
    maxValue: 25
  })
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}
