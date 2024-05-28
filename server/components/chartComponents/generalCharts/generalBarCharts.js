import { showBarChart } from '../basicCharts/barChart'
import {
  getDataSetByDataNames,
  getDataByName,
} from '../../../lib/datalib/parseData'
import {
  getMissingDataColumn,
  emptyValue,
  showGraph,
} from '../../componentsUtils/visualizationGraph'
import {
  ScoreSegmentColors,
  DataColumns,
  ScoreSegmentLabels,
  SingleBarColors,
} from '../../../models/dataset'
import {
  getNormalizedValue,
  getGraduationValue,
} from '../../../lib/datalib/calculateData'
import { Space } from 'antd'
import Styles from '../chartcomponents.module.css'

/**
 * Display data for alcool and depression
 * @param {Object} data - The medical data
 * @param {Object} maxValues - The maximum data set
 * @param {String} dataName - The data name
 * @param {Object} scales - The graph scales in array
 * @param {String} graphType - The graph type
 * @returns The balance bar charts
 */
const createBalanceBar = ({ data, maxValues, dataName, scales, graphType, ticksCallback, drawGrid, stepSize }) => {
  let normalizedDataSet = []
  let labelName = []
  const keys = Object.keys(data)
  const columns = DataColumns.cerq.nonAdaptativesColumns.concat(
    DataColumns.cerq.adaptativesColumns,
  )
  keys.forEach((k, index) => {
    switch (k) {
      case columns[0]:
        labelName.push(['Blâme', "d'autrui"])
        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      case columns[1]:
        labelName.push(['Rumination'])
        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      case columns[2]:
        labelName.push([`Blâme`, 'de soi'])
        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      case columns[3]:
        labelName.push(['Dramatisation'])
        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      case columns[4]:
        labelName.push(['Acceptation'])
        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      case columns[5]:
        labelName.push(['Centration', 'positive'])
        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      case columns[6]:
        labelName.push([`Centration`, `sur l'action`])

        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      case columns[7]:
        labelName.push(['Réévaluation', 'positive'])
        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      case columns[8]:
        labelName.push(['Mise en', 'perspective'])
        normalizedDataSet.push({
          colName: k,
          value: (100 * data[k]) / maxValues[index],
        })
        break
      default:
        break
    }
  })

  return showBarChart({
    medicalData: normalizedDataSet,
    labelName: labelName,
    dataName: dataName,
    maxValues: maxValues,
    chartWidth: '490px',
    chartHeight: '230px',
    marginLeft: '-58px',
    maxBarThickness: '35',
    scales: scales,
    graphType: graphType,
    ticksCallback: ticksCallback,
    drawGrid: drawGrid,
    stepSize: stepSize,
  })
}

/**
 * The blance graph for depression and alcool
 * @param {Object} medicalData - The medical data
 * @param {Object} temps - The two time steps in array
 * @param {String} graphType - The graph type
 * @returns
 */
export const showRegulationEmotionBarBlance = ({
  medicalData,
  temps,
  graphType,
}) => {
  let sortedNonAdaptaData = []
  let sortedAdaptaData = []
  let missingGeneralColumn = []
  const readNonAdaptaData = getDataSetByDataNames(
    medicalData,
    temps[0],
    DataColumns.cerq.nonAdaptativesColumns,
  )

  const readAdaptaData = getDataSetByDataNames(
    medicalData,
    temps[0],
    DataColumns.cerq.adaptativesColumns,
  )

  let missingCols = []
  if (readNonAdaptaData && readNonAdaptaData.missingDataCol.length > 0) {
    missingCols.push(readNonAdaptaData.missingDataCol)
  }
  if (readAdaptaData && readAdaptaData.missingDataCol.length > 0) {
    missingCols.push(readAdaptaData.missingDataCol)
  }

  if (missingCols) {
    missingGeneralColumn = [
      {
        time: temps[0],
        missingCols: missingCols,
      },
    ]
  }

  const getColor = (max, color) => {
    return [
      {
        threshold: max,
        color: color,
      },
    ]
  }

  const leftScales = [
    getColor(20, SingleBarColors.brightBlueRGBString),
    getColor(20, SingleBarColors.pastelOrangeRGBString),
    getColor(20, SingleBarColors.persianIndigoRGBString),
    getColor(20, SingleBarColors.axolotRGBString),
  ]

  const rightScales = [
    getColor(20, SingleBarColors.tickleMePinkRGBString),
    getColor(20, SingleBarColors.pinkRGBString),
    getColor(20, SingleBarColors.darkYellowGreenRGBString),
    getColor(20, SingleBarColors.congoPinkRGBString),
    getColor(20, SingleBarColors.darkRedRGBString),
  ]

  sortedNonAdaptaData = Object.fromEntries(
    Object.entries(readNonAdaptaData.dataSetObject).sort(
      ([, a], [, b]) => a - b,
    ),
  )

  console.log(sortedNonAdaptaData)
  sortedAdaptaData = Object.fromEntries(
    Object.entries(readAdaptaData.dataSetObject).sort(([, a], [, b]) => a - b),
  )

  const graph = (
    <>
      <Space direction="vertical" className={Styles.balanceBarSpace}>
        <h2 className={Styles.regulationEmoTitle}>Régulation des émotions</h2>
        <Space direction="horizontal">
          <div>
            <Space direction="vertical" className={Styles.balanceBarSpace}>
            </Space>
          </div>
          <Space direction="vertical">
            {createBalanceBar({
              data: sortedNonAdaptaData,
              maxValues: [20, 20, 20, 20],
              dataName: 'Stratégies non adaptatives',
              scales: leftScales,
              graphType: graphType,
              ticksCallback: function (value, index) {
                switch (value) {
                  case 0:
                    return 0
                  case 50:
                    return 10
                  case 100:
                    return 20
                  default:
                    break
                }
              },
              drawGrid: true,
              stepSize: 25,
            })}
            <div className={Styles.leftLine}>______________</div>
            <div className={Styles.left} />
          </Space>
          <Space direction="vertical">
            {createBalanceBar({
              data: sortedAdaptaData,
              maxValues: [20, 20, 20, 20, 20],
              dataName: 'Stratégies adaptatives',
              scales: rightScales,
              graphType: graphType,
              ticksCallback: function (value, index) {
                switch (value) {
                  case 0:
                    return 0
                  case 50:
                    return 10
                  case 100:
                    return 20
                  default:
                    break
                }
              },
              drawGrid: true,
              stepSize: 25,
            })}
            <div className={Styles.rightLine}>______________</div>
            <div className={Styles.right} />
          </Space>
        </Space>
        <div className={Styles.bottom}> Comment je gère mes émotions?</div>
        <div className={Styles.bottom1} />
      </Space>
    </>
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
  })
}

/**
 * The anxiety data for depression and alcool
 * @param {Object} medicalData - The read medical data
 * @param {String} time - The time step
 * @param {String} graphType - The graph type
 * @returns The bar chart
 */
export const showAnxietyBar = ({ medicalData, time, graphType }) => {
  let data = DataColumns.gad7.columns.map((cname) => {
    const readValue = getNormalizedValue(
      medicalData,
      cname,
      time,
      medicalData.name,
      21,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingTotalDataColumn = getMissingDataColumn(data, time)
  const graph = showBarChart({
    medicalData: data,
    labelName: [''],//DataColumns.gad7.name,
    dataName: 'Anxiété (GAD7)',
    maxValues: [21],
    chartWidth: '200px',
    ticks: [0, 4.5, 9.5, 14.5],
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
          threshold: 21,
          color: ScoreSegmentColors.sévèreRGBString,
        },
      ],
    ],
    ticksCallback: function (value) {
      switch (value) {
        case 15:
          return ScoreSegmentLabels.absente
        case 30:
          return ScoreSegmentLabels.léger
        case 55:
          return ScoreSegmentLabels.modéré
        case 85:
          return ScoreSegmentLabels.sévère
        default:
          break
      }
    },
    graphType: graphType,
  })
  return showGraph({
    missingTotalColumn: missingTotalDataColumn,
    graph: graph,
  })
}

/**
 * Display auto-efficacity data
 * @param {Object} medicalData - The medical data retrieved from REDCap
 * @param {String} time - Depression data: time = T2, Alcohol data: time = T1
 * @param {String} graphType - The graph type
 * @returns The bar chart
 */
export const showAutoEfficacitéBar = ({ medicalData, time, graphType }) => {
   let data = DataColumns.gse.columns.map((cname) => {
    const readValue = getGraduationValue(
      medicalData,
      cname,
      time,
      medicalData.name,
      10,
      40,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingTotalDataColumn = getMissingDataColumn(data, time)

  const graph = showBarChart({
    medicalData: data,
    labelName: [''], //DataColumns.gse.name,
    dataName: ['Auto-efficacité', '(GSES)'],
    maxValues: [100],
    chartWidth: '200px',
    ticks: [0],
    scales: [
      [
        {
          threshold: 50,
          color: ScoreSegmentColors.nothingRGBString,
        },
        {
          threshold: 100,
          color: ScoreSegmentColors.sévèreRGBString,
        },
      ],
    ],
    drawGrid: true,
    stepSize: 10,
    ticksCallback: function (value) {
      switch (value) {
        case 0:
          return 0
        case 50:
          return 50
        case 100:
          return 100
        default:
          break
      }
    },
    graphType: graphType,
  })
  return showGraph({
    missingTotalColumn: missingTotalDataColumn,
    graph: graph,
  })
}

/**
 * Display the depression or alcool consommation subsstance
 * @returns The bar chart
 */
export const showConsommationsSubstancesBar = ({
  medicalData,
  time,
  graphType,
  showAlcool,
}) => {
  const maxValues = [39, 39, 39, 39, 39, 39, 39, 39]
  const colors = [
    {
      threshold: 3,
      color: ScoreSegmentColors.absenteRGBString,
    },
    {
      threshold: 27,
      color: ScoreSegmentColors.légerRGBString,
    },
    {
      threshold: 39,
      color: ScoreSegmentColors.sévèreRGBString,
    },
  ]
  const scales = [
    colors,
    colors,
    colors,
    colors,
    colors,
    colors,
    colors,
    colors,
  ]

  // get consommation data
  let consommationData = DataColumns.assistv3.consommation_columns.map(
    (cname, index) => {
      const readValue = getNormalizedValue(
        medicalData,
        cname,
        time,
        medicalData.name,
        maxValues[index],
      )
      return {
        colName: cname,
        value: readValue || readValue == 0 ? readValue : null,
      }
    },
  )
  const missingGeneralColumn = getMissingDataColumn(consommationData, time)
  // get alcool data
  let missingTotalColumn = []
  let missingCols = []
  let alcoolData = []
  for (
    let c = 0;
    c < DataColumns.assistv3.columns_assist_alcool_tot.length;
    c++
  ) {
    const value = getDataByName(
      medicalData,
      'assist_alcool_tot',
      time,
      medicalData.name,
    )
    alcoolData.push(value)
    if (emptyValue(value)) {
      missingCols.push(DataColumns.assistv3.columns_assist_alcool_tot[c])
    }
  }

  missingTotalColumn.push({ time: time, missingCols: missingCols })

  const sumAlcool = alcoolData[0]

  const sumAlcoolData = {
    colName: DataColumns.assistv3.consommation_alcool,
    value: (100 * sumAlcool) / maxValues[0],
  }
  const graph = (
    <div>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#666666',
          marginLeft: '40px',
        }}
      >
        {`Niveau d'intervention (ASSIST)`}
      </h2>
      <Space
        direction="horizontal"
        style={{ marginLeft: '65px', marginTop: '20px' }}
      >
        <div style={{ display: 'inline-flex' }}>
          <div style={{ backgroundColor: 'green', width: '40px' }}></div>
          <div style={{ color: '#666666', marginLeft: '10px', width: 'fit-content' }}>
            {`Pas d'intervention`}
          </div>
        </div>
        <div style={{ display: 'inline-flex' }}>
          <div style={{ backgroundColor: 'yellow', width: '30px' }}></div>
          <div style={{ color: '#666666', marginLeft: '10px', width: 'fit-content' }}>
            Intervention brève
          </div>
        </div>
        <div style={{ display: 'inline-flex' }}>
          <div style={{ backgroundColor: 'red', width: '40px' }}></div>
          <div style={{ color: '#666666', marginLeft: '10px', width: 'fit-content' }}>
            Traitement plus intensif
          </div>
        </div>
      </Space>
      <Space direction="horizontal">
        {
          showAlcool ? (
            <div style={{ marginTop: '-20px' }}>
          {showBarChart({
            medicalData: [sumAlcoolData],
            labelName: ['Alcool'],
            maxValues: [39],
            chartWidth: '180px',
            chartHeight: '430px',
            marginLeft: '-20px',
            ticks: [0, 10, 27],
            scales: [
              [
                {
                  threshold: 10,
                  color: ScoreSegmentColors.absenteRGBString,
                },
                {
                  threshold: 27,
                  color: ScoreSegmentColors.légerRGBString,
                },
                {
                  threshold: 39,
                  color: ScoreSegmentColors.sévèreRGBString,
                },
              ],
            ],
            ticksCallback: function (value) {
              switch (value) {
                case 25:
                  return '10'
                case 70:
                  return '27'
                default:
                  break
              }
            },
            graphType: graphType,
          })}
        </div>
          ) : 
        (<div style={{ marginLeft: '55px' }}>
        </div>)
        }
        <div style={{ marginTop: '-20px' }}>
          {showBarChart({
            medicalData: consommationData,
            labelName: DataColumns.assistv3.name,
            maxValues: maxValues,
            chartWidth: '600px',
            marginLeft: '-55px',
            ticks: [0, 3, 27],
            scales: scales,
            ticksCallback: function (value) {
              switch (value) {
                case 5:
                  return 3
                case 70:
                  return 27
                default:
                  break
              }
            },
            graphType: graphType,
          })}
        </div>
      </Space>
    </div>
  )

  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    missingTotalColumn: missingTotalColumn,
    graph: graph,
  })
}

/**
 * Dispaly the external alliance therapy data
 * @returns The bar chart
 */
export const showExterneAllianceTherapBar = ({
  medicalData,
  time,
  graphType,
}) => {
  let data = DataColumns.wai.columns.map((cname) => {
    const readValue = getGraduationValue(
      medicalData,
      cname,
      time,
      medicalData.name,
      12,
      84,
    )
    return {
      colName: cname,
      value: readValue ? readValue : null,
    }
  })
  const missingGeneralColumn = getMissingDataColumn(data, time)

  const graph = showBarChart({
    medicalData: data,
    labelName: [''],//DataColumns.wai.name,
    dataName: ["L'alliance", 'thérapeutique (WAI)'],
    maxValues: [100],
    chartWidth: '200px',
    ticks: [0, 100],
    scales: [
      [
        {
          threshold: 0,
          color: SingleBarColors.purple,
        },
        {
          threshold: 100,
          color: SingleBarColors.purple,
        },
      ],
    ],
    drawGrid: true,
    stepSize: 10,
    ticksCallback: function (value) {
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
    graphType: graphType,
  })
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
  })
}
