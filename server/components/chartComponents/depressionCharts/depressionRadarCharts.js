import { getDataByName } from '../../../lib/datalib/parseData'
import { DataColumns, RadarDataColors } from '../../../models/dataset'
import { getDataSetByDataNames } from '../../../lib/datalib/parseData'
import {
  showGraph,
  emptyValue,
  transparentize,
} from '../../componentsUtils/visualizationGraph'
import { RadarLineChart } from '../basicCharts/radarLineChart'
import { RadarChartStacked } from '../basicCharts/radarchartStacked'
import { Space } from 'antd'

/**
 * Display the force and fragility for depression
 * @param {Object} medicalData - The medical data
 * @param {Object} temps - Time steps in array
 * @param {boolean} doShowWarning - display the warning text
 * @returns The Radar chart
 */
/**
 * Renders a radar chart displaying depression force and fragility data.
 *
 * @param {Object} options - The options for rendering the radar chart.
 * @param {Array} options.medicalData - The medical data used for generating the chart.
 * @param {Array} options.temps - The time periods for which the data is displayed.
 * @param {boolean} options.doShowWarning - Indicates whether to show a warning message.
 * @returns {Object} - The rendered radar chart.
 */
export const showDepressionForceFragilityRadar = ({
  medicalData,
  temps,
  doShowWarning,
}) => {
  const missingGeneralColumn = []

  const dataNamesTime1 = [
    DataColumns.assistv3.consommation_presence,
    DataColumns.ctq.resultExposition,
    DataColumns.cerq.columns[1],
    DataColumns.cerq.columns[0],
    DataColumns.ssq6.columns[1],
    DataColumns.ssq6.columns[0],
    DataColumns.noGroupData.suiviPsyActuel,
  ]

  const dataNamesTime2 = [
    DataColumns.phq9.columns[0],
    DataColumns.gad7.columns[0],
    DataColumns.hsi.columns[0],
    DataColumns.isi.columns[0],
    DataColumns.gse.columns[0],
    DataColumns.wai.columns[0],
  ]

  const dataTime1 = getDataSetByDataNames(medicalData, temps[0], dataNamesTime1)
  const dataTime2 = getDataSetByDataNames(medicalData, temps[1], dataNamesTime2)

  if (dataTime1) {
    missingGeneralColumn.push({
      time: temps[0],
      missingCols: dataTime1.missingDataCol,
    })
  }

  if (dataTime2) {
    missingGeneralColumn.push({
      time: temps[1],
      missingCols: dataTime2.missingDataCol,
    })
  }

  // let minValue = Math.min(...mergedData)
  let minValue = 0

  const labels = [
    ['Évènements difficiles', "durant l'enfance"],
    ['Attention aux consommation'],
    ['Symptômes', 'dépressifs résiduels'],
    'Hypersomnolence',
    'Insomnie',
    'Comorbidité Anxieuse',
    ['Régulations émotionnelles', 'non-adaptatives'],
    '',
    // -------------- forces ----
    ['Régulations', 'émotionnelles adaptatives'],
    ["Sentiment d'auto-efficacité"],
    ['Suivi', 'psychothérapeutique'],
    ['Alliance thérapeutique'],
    ['Satisfaction du soutien social'],
    ['Disponibilité ', 'du soutien social'],
  ]

  const rightColor = 'rgba(0, 0, 255, 1)'
  const leftColor = 'rgba(255, 128, 0, 1)'
  const colors = [
    leftColor,
    leftColor,
    leftColor,
    leftColor,
    leftColor,
    leftColor,
    leftColor,
    // --------
    rightColor,
    rightColor,
    rightColor,
    rightColor,
    rightColor,
    rightColor,
    rightColor,
  ]

  const modifiedData = [
    dataTime1.dataSet[1], // ctq_exposition
    dataTime1.dataSet[0], // consommation_presence
    (dataTime2.dataSet[0] / DataColumns.phq9.maxTotal) * 100, // phq9_tot
    (dataTime2.dataSet[2] / DataColumns.hsi.maxTotal) * 100, // hsi_tot
    (dataTime2.dataSet[3] / DataColumns.isi.maxTotal) * 100, // isi_tot
    (dataTime2.dataSet[1] / DataColumns.gad7.maxTotal) * 100, // gad7_tot
    (dataTime1.dataSet[2] / DataColumns.cerq.regnonadaptMaxTotal) * 100, // cerq_regnonadapivie
    0,
    // forces
    (dataTime1.dataSet[3] / DataColumns.cerq.regadaptMaxTotal) * 100, // cerq_regadapivie
    (dataTime2.dataSet[4] / DataColumns.gse.maxTotal) * 100, // gse_tot
    dataTime1.dataSet[6] === '-999' ? 0 : dataTime1.dataSet[6], // suvi_psy_actuel
    (dataTime2.dataSet[5] / DataColumns.wai.maxTotal) * 100, // wai_tot
    (dataTime1.dataSet[4] / DataColumns.ssq6.qualityMaxTotal) * 100, // ssq6_qual
    (dataTime1.dataSet[5] / DataColumns.ssq6.quantityMaxTotal) * 100, // ssq6_quant
  ]

  const timeDataSet = [{ time: temps[1], data: modifiedData }]
  const graph = (
    <Space direction="horizonal">
      <h2 style={{ color: 'rgba(0, 0, 255, 1)', marginTop: '230px' }}>
        Forces
      </h2>
      <div>
        {RadarLineChart({
          dataSet: timeDataSet,
          scorelabels: labels,
          dataName: 'Prévention de la rechute',
          minValue: minValue,
          colors: colors,
          chartWidth: '550px',
          chartHeight: '530px',
          isDivide: true,
          changeStartAngle: true,
        })}
      </div>
      <h2 style={{ color: 'rgba(255, 128, 0, 1)', marginTop: '230px' }}>
        Fragilités
      </h2>
    </Space>
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * Display the reactivity emotionell data for depression
 * @returns The Radar graph
 */
export const showReactiviteEmoRadar = ({ medicalData, temps }) => {
  let missingGeneralColumn = []
  let valueSet = []
  for (let i = 0; i < temps.length; i++) {
    let values = []
    let missingCols = []
    for (let c = 0; c < DataColumns.mathyS.columns.length; c++) {
      let value = getDataByName(
        medicalData,
        DataColumns.mathyS.columns[c],
        temps[i],
        medicalData.name,
      )

      values.push(value)
      if (emptyValue(value)) {
        missingCols.push(DataColumns.mathyS.columns[c])
      }
    }
    valueSet.push(values)
    missingGeneralColumn.push({ time: temps[i], missingCols: missingCols })
  }

  const data = {
    labels: DataColumns.mathyS.columns,
    datasets: [
      {
        label: DataColumns.mathyS.name[0],
        data: [40, 40, 40, 40, 40],
        borderColor: RadarDataColors.greenRGBString,
        backgroundColor: transparentize(RadarDataColors.greenRGBString, 0.8),
        showLine: false,
        fill: false,
      },
      {
        label: DataColumns.mathyS.name[1],
        data: [40, 40, 40, 40, 40],
        borderColor: RadarDataColors.blueRGBString,
        backgroundColor: transparentize(RadarDataColors.blueRGBString, 0.8),
        showLine: false,
        fill: false,
      },
      {
        label: DataColumns.mathyS.name[2],
        data: [30, 30, 30, 30, 30],
        borderColor: RadarDataColors.yellowRGBString,
        backgroundColor: transparentize(RadarDataColors.yellowRGBString, 0.8),
        showLine: false,
        fill: '1',
      },
      {
        label: DataColumns.mathyS.name[3],
        data: [40, 40, 40, 40, 40],
        borderColor: RadarDataColors.orangeRGBString,
        backgroundColor: transparentize(RadarDataColors.orangeRGBString, 0.8),
        showLine: false,
        fill: '-1',
      },
      {
        label: DataColumns.mathyS.name[4],
        data: [50, 50, 50, 50, 50],
        borderColor: RadarDataColors.royalPurpleRGBString,
        backgroundColor: transparentize(
          RadarDataColors.royalPurpleRGBString,
          0.8,
        ),
        showLine: false,
        fill: '1',
      },
      {
        label: temps[0],
        data: valueSet[0],
        borderColor: RadarDataColors.greenRGBString,
        backgroundColor: transparentize(RadarDataColors.greenRGBString),
        fill: true,
      },
      {
        label: temps[1],
        data: valueSet[1],
        borderColor: RadarDataColors.blueRGBString,
        backgroundColor: transparentize(RadarDataColors.blueRGBString),
      },
    ],
  }
  const graph = (
    <div>
      <RadarChartStacked
        dataSet={data}
        dataName={'Réactivité émotionnelle (MAThyS)'}
      />
    </div>
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
  })
}
