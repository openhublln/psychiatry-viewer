import { getNormalizedValue } from '../../../lib/datalib/calculateData'
import {
  DataColumns,
  ScoreSegmentColors,
  ScoreSegmentLabels,
  SingleBarColors,
  GraphType,
} from '../../../models/dataset'
import { showBarChart } from '../basicCharts/barChart'
import { getDataByName } from '../../../lib/datalib/parseData'
import {
  getMissingDataColumn,
  showGraph,
  emptyValue,
} from '../../componentsUtils/visualizationGraph'
import { Space } from 'antd'

/**
 * Show the alcool depression status
 * @param {Object} medicaldata: medical data
 * @param {String} time: the time step
 * @returns the bar chart of the data
 */
export const showAlcoDepressionBar = ({ medicalData, time, doShowWarning }) => {
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

  const missingTotalColumn = getMissingDataColumn(data, time)

  const q9 = getDataByName(
    medicalData,
    'phq9_q9',
    time,
    medicalData.name,
  )

  const barChart = showBarChart({
    medicalData: data,
    labelName: [''],//DataColumns.phq9.name,
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
    graphType: 'alcohol',
  })
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: barChart,
    subText: (q9 && q9 >= 0) ? "N.B.:!" : null,
    noVisible: !doShowWarning,
  })
}

/**
 * The trouble usage of alcool status
 * @param {Object} medicalData - medical data
 * @param {String} time - time step
 * @returns the bar chart of the data
 */
export const showTroubleUsageAlcoBar = ({ medicalData, time, patientName, doShowWarning }) => {
  let data = DataColumns.dsm.columns.map((cname) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      patientName,
      11,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })

  const missingTotalColumn = getMissingDataColumn(data, time)

  const barchart = showBarChart({
    medicalData: data,
    labelName: DataColumns.dsm.name,
    dataName: ['Le trouble de', 'l’usage de l’alcool (DSM-5)'],
    maxValues: [11],
    chartWidth: '250px',
    backgroundColor: '',
    ticks: [0, 2, 3.5, 5.5],
    scales: [
      [
        {
          threshold: 2,
          color: ScoreSegmentColors.absenteRGBString,
        },
        {
          threshold: 3.5,
          color: ScoreSegmentColors.légerRGBString,
        },
        {
          threshold: 5.5,
          color: ScoreSegmentColors.modéréRGBString,
        },
        {
          threshold: 11,
          color: ScoreSegmentColors.sévèreRGBString,
        },
      ],
    ],
    ticksCallback: function (value) {
      switch (value) {
        case 10:
          return ScoreSegmentLabels.absenceDeTual
        case 25:
          return ScoreSegmentLabels.léger
        case 40:
          return ScoreSegmentLabels.modéré
        case 80:
          return ScoreSegmentLabels.sévère
        default:
          break
      }
    },
    graphType: GraphType.alcohol,
  })
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: barchart,
    noVisible: !doShowWarning,
  })
}

/**
 * The Insomier data for alcool
 * @returns the visualization in bar chart
 */
export const showAlcoInsomnieBar = ({ medicalData, time, patientName, doShowWarning }) => {
  let data = DataColumns.isi.columns.map((cname) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      patientName,
      28,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingTotalColumn = getMissingDataColumn(data, time)
  const barChart = showBarChart({
    medicalData: data,
    labelName: [''],//DataColumns.isi.name,
    dataName: 'Insomnie (ISI)',
    maxValues: [28],
    chartWidth: '200px',
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
    graphType: GraphType.alcohol,
  })
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: barChart,
    noVisible: !doShowWarning,
  })
}

/**
 * The visulization for live quality
 * @returns the bar chart
 */
export const showQulityVieBar = ({ medicalData, time, doShowWarning }) => {
  const maxValues = [100, 100, 100, 100]
  let data = DataColumns.whoQolBref.resultColumns.map((cname) => {
    return {
      colName: cname,
      value: getDataByName(medicalData, cname, time, medicalData.name),
    }
  })
  const missingGeneralColumn = getMissingDataColumn(data, time)
  const barChart = showBarChart({
    medicalData: data,
    labelName: DataColumns.whoQolBref.name,
    dataName: 'La qualité de vie',
    maxValues: maxValues,
    chartWidth: '550px',
    scales: [
      [
        {
          threshold: 100,
          color: SingleBarColors.brightBlueRGBString,
        },
      ],
      [
        {
          threshold: 100,
          color: SingleBarColors.pastelOrangeRGBString,
        },
      ],
      [
        {
          threshold: 100,
          color: SingleBarColors.persianIndigoRGBString,
        },
      ],
      [
        {
          threshold: 100,
          color: SingleBarColors.axolotRGBString,
        },
      ],
    ],
    ticksCallback: function (value, index) {
      switch (value) {
        case 100:
          return 100
        case 50:
          return 50
        case 0:
          return 0
        default:
          break
      }
    },
    drawGrid: true,
    stepSize: 10,
    graphType: GraphType.alcohol,
  })
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: barChart,
    noVisible: !doShowWarning,
  })
}

/**
 * The visulaization for craving status
 * @param {Object} medicalData: the read medical data
 * @param {String} time: the time step
 * @param {String} backgroundColor: the background color of the graph
 * @returns bar chart
 */
export const showAlcoCravingBar = ({
  medicalData,
  time,
  dataName,
  backgroundColor,
  noVisibleMissingDataDialog = false,
}) => {
  const maxValues = [20, 12, 32]
  let data = DataColumns.ocds.columns.map((cname, index) => {
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
  const barChart = showBarChart({
    medicalData: data,
    labelName: DataColumns.ocds.name,
    dataName: dataName,
    maxValues: maxValues,
    chartBcColor: backgroundColor,
    scales: [
      [
        {
          threshold: 20,
          color: SingleBarColors.brightBlueRGBString,
        },
      ],
      [
        {
          threshold: 12,
          color: SingleBarColors.pastelOrangeRGBString,
        },
      ],
      [
        {
          threshold: 32,
          color: SingleBarColors.persianIndigoRGBString,
        },
      ],
    ],
    graphType: GraphType.alcohol,
    drawGrid: true,
    stepSize: 10,
    ticksCallback: function (value, index) {
      switch (value) {
        case 100:
          return 100
        case 50:
          return 50
        case 0:
          return 0
        default:
          break
      }
    },
  })
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: barChart,
    noVisible: noVisibleMissingDataDialog,
  })
}

/**
 * The data for congnition status
 * @param {Object} medicalData - the medical data
 * @param {String}temps: two time steps
 * @returns the congnition bar chart
 */
export const showAlcoCongnitionBar = ({ medicalData, temps, doShowWarning }) => {
  const maxValues = [5, 6, 5, 6, 8]
  let data = DataColumns.bearni.columns.map((cname, index) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      temps[1],
      medicalData.name,
      maxValues[index],
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })

  const missingGeneralColumn = getMissingDataColumn(data, temps[1])
  let missingSpecialColumn = []
  let missingBearniTotal = []
  const diploma = getDataByName(
    medicalData,
    'diploma',
    temps[0],
    medicalData.name,
  )

  if (emptyValue(diploma)) {
    missingSpecialColumn.push({
      time: temps[1],
      missingCols: ['diploma'],
    })
  }

  const cutOffSegments = {}
  if (diploma && diploma < 6) {
    cutOffSegments[ScoreSegmentLabels.noProblem] = 20
    cutOffSegments[ScoreSegmentLabels.léger] = 17
  } else {
    cutOffSegments[ScoreSegmentLabels.noProblem] = 22
    cutOffSegments[ScoreSegmentLabels.léger] = 18
  }

  let bearni_tot = 0
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    bearni_tot += (maxValues[index] / 100) * element['value']
  }
  let sectionMin, sectionMax, tickMin, tickMax = 0;
  // Define in which zone the score should be placed
  if (bearni_tot >= cutOffSegments[ScoreSegmentLabels.noProblem]) {
    // Pas de trouble
    sectionMax = 30
    sectionMin = cutOffSegments[ScoreSegmentLabels.noProblem]
    tickMin = 0
    tickMax = 35
  } else if (bearni_tot >= cutOffSegments[ScoreSegmentLabels.léger]) {
    // léger
    sectionMax = cutOffSegments[ScoreSegmentLabels.noProblem]
    sectionMin = cutOffSegments[ScoreSegmentLabels.léger]
    tickMin = 35
    tickMax = 65
  } else {
    // modére
    sectionMax = cutOffSegments[ScoreSegmentLabels.léger]
    sectionMin = 0
    tickMin = 65
    tickMax = 100
  }
  
  let bearni_tot_modif = (sectionMin == bearni_tot) ? bearni_tot + 0.25 : bearni_tot
  let Valeur_cible = tickMin + ((bearni_tot_modif - sectionMin) * (tickMax - tickMin)) / (sectionMax - sectionMin)
  let bearni_prc = (bearni_tot * 100) / 30
  if (emptyValue(bearni_tot)) {
    missingBearniTotal.push({
      time: temps[1],
      missingCols: [DataColumns.bearni.total],
    })
  }
  const graph = (
    <Space direction="vertical">
      <div>
      {showBarChart({
          medicalData: [[tickMin,Valeur_cible]],
          labelName: ['Total'],
          dataName: ['Troubles neuro-psychologiques (BEARNI)', 'Total'],
          maxValues: [30],
          chartHeight: '180px',
          chartWidth: '515px',
          isFloating: true,
          tooltipForcedValue: bearni_prc + '% of 30',
          scales: [
            [
              {
                threshold: 35,
                color: ScoreSegmentColors.absenteRGBString,
              },
              {
                threshold: 65,
                color: ScoreSegmentColors.légerRGBString,
              },
              {
                threshold: 100,
                color: ScoreSegmentColors.modéréRGBString,
              },
            ],
          ],
          ticksCallback: function (value, index) {
            switch (value) {
              case 0:
                return ScoreSegmentLabels.noProblem
              case 35:
                return ScoreSegmentLabels.léger
              case 65:
                return ScoreSegmentLabels.modéré
              default:
                break
            }
          },
          graphType: GraphType.alcohol,
          isHorizontal: true,
        })}
      </div>
      <div>
      {showBarChart({
          medicalData: data,
          labelName: DataColumns.bearni.name,
          dataName: 'Scores aux sous-catégories',
          maxValues: maxValues,
          chartHeight: '500px',
          chartWidth: '520px',
          scales: [
            [
              {
                threshold: 8,
                color: SingleBarColors.brightBlueRGBString,
              },
            ],
            [
              {
                threshold: 5,
                color: SingleBarColors.pastelOrangeRGBString,
              },
            ],
            [
              {
                threshold: 6,
                color: SingleBarColors.persianIndigoRGBString,
              },
            ],
            [
              {
                threshold: 5,
                color: SingleBarColors.axolotRGBString,
              },
            ],
            [
              {
                threshold: 6,
                color: SingleBarColors.tickleMePinkRGBString,
              },
            ],
          ],
          ticksCallback: function (value, index) {
            switch (value) {
              case 100:
                return 100
              case 50:
                return 50
              case 0:
                return 0
              default:
                break
            }
          },
          drawGrid: true,
          stepSize: 10,
          graphType: GraphType.alcohol,
        })}
      </div>
    </Space>
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    missingTotalColumn: missingBearniTotal,
    missingSpecialColumn: missingSpecialColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * Visualization for motiviation change
 * @returns bar chart
 */
export const showMotivationChangeBar = ({ medicalData, time, patientName, doShowWarning }) => {
  const maxValues = [35, 20, 40]
  let data = DataColumns.socrates.columns.map((cname, index) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      patientName,
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
    labelName: DataColumns.socrates.name,
    dataName: ['Motivation et préparation au changement', '(SOCRATES)'],
    maxValues: maxValues,
    scales: [
      [
        {
          threshold: 35,
          color: SingleBarColors.brightBlueRGBString,
        },
      ],
      [
        {
          threshold: 20,
          color: SingleBarColors.pastelOrangeRGBString,
        },
      ],
      [
        {
          threshold: 40,
          color: SingleBarColors.persianIndigoRGBString,
        },
      ],
    ],
    ticksCallback: function (value, index) {
      switch (value) {
        case 100:
          return 100
        case 50:
          return 50
        case 0:
          return 0
        default:
          break
      }
    },
    drawGrid: true,
    stepSize: 10,
    graphType: GraphType.alcohol,
  })
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}
