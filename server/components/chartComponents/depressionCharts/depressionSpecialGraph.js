import { getDataSetByDataNames } from '../../../lib/datalib/parseData'
import { DataColumns } from '../../../models/dataset'
import { showGraph } from '../../componentsUtils/visualizationGraph'
import Styles from '../chartcomponents.module.css'

/**
 * Get the displayed data name
 * @param {String} dataName - The data name
 * @param {Object} dataColumns - The data columns
 * @param {Object} labelSet - The labels
 * @returns the display name for the graph
 */
export const getDataDisplayName = (dataName, dataColumns, labelSet) => {
  let label = ''
  dataColumns.forEach((cname, index) => {
    if (cname.trim().toLowerCase() === dataName.trim().toLowerCase()) {
      label = labelSet[index]
    }
  })
  return label
}

/**
 * Display indices bipolarity special graph
 * @param {String} title - The graph title
 * @param {Object} medicalData - The read medical data
 * @param {String} time - The time step
 * @returns The special graph
 */
export const showIndicesBipolarityGraph = ({ title, medicalData, time }) => {
  let missingGeneralColumn = []
  const dataSetLeft = getDataSetByDataNames(
    medicalData,
    time,
    DataColumns.bipolarity.graphLeftColumns,
  )
  const dataSetRight = getDataSetByDataNames(
    medicalData,
    time,
    DataColumns.bipolarity.graphRightColumns,
  )

  let missingCols = []
  if (dataSetLeft) {
    missingCols.push(dataSetLeft.missingDataCol)
  }
  if (dataSetRight) {
    missingCols.push(dataSetRight.missingDataCol)
  }

  missingGeneralColumn = [
    {
      time: time,
      missingCols: missingCols,
    },
  ]

  const filteredDatasetLeft = Object.keys(dataSetLeft?.dataSetObject).filter(
    (key) =>
      dataSetLeft.dataSetObject[key] === 1 ||
      dataSetLeft.dataSetObject[key] === '1',
  )
  const filteredDatasetRight = Object.keys(dataSetRight?.dataSetObject).filter(
    (key) =>
      dataSetRight.dataSetObject[key] === 1 ||
      dataSetRight.dataSetObject[key] === '1',
  )

  const getDivs = (data, position) => {
    const half = (data.length - 1) / 2
    return data.map((item, i) => {
      const level = Math.floor(Math.abs(i - half)) + 1
      const dataColumns =
        position === 'L'
          ? DataColumns.bipolarity.graphLeftColumns
          : DataColumns.bipolarity.graphRightColumns
      const labelSet =
        position === 'L'
          ? DataColumns.bipolarity.graphLeftDataNames
          : DataColumns.bipolarity.graphRightDataNames
      const label = getDataDisplayName(item, dataColumns, labelSet)
      return (
        <div style={{ '--level': level }} key={label + i}>
          {label}
        </div>
      )
    })
  }

  const graph = (
    <div style={{ display: 'inline-block', textAlign: 'center' }}>
      <h2  style={{ color: '#666666' }}>Indices de bipolarité</h2>
      <div className={Styles.bipolarityChart}>
        <div className={Styles.leftPart}>
          {getDivs(filteredDatasetLeft, 'L')}
        </div>
        <div className={Styles.diamondShape}>
          <div className={Styles.centerText}>{title}</div>
        </div>
        <div className={Styles.rightPart}>
          {getDivs(filteredDatasetRight, 'R')}
        </div>
      </div>
    </div>
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
  })
}

/**
 * Display the symptomes residuel graph
 * @returns The special grpah
 */
export const showSymptomesResiduelGraph = ({
  medicalData,
  time,
  doShowWarning,
}) => {
  let missingGeneralColumn = []
  const dataSetLeftTop = getDataSetByDataNames(
    medicalData,
    time,
    DataColumns.symptoResides.graphColumnsleftTop,
  )
  const dataSetLeftBottom = getDataSetByDataNames(
    medicalData,
    time,
    DataColumns.symptoResides.graphColumnsLeftBottom,
  )
  const dataSetRight = getDataSetByDataNames(
    medicalData,
    time,
    DataColumns.symptoResides.graphColumnsRight,
  )

  let missingCols = []
  if (dataSetLeftTop && dataSetLeftTop.missingDataCol.length > 0) {
    missingCols.push(dataSetLeftTop.missingDataCol)
  }
  if (dataSetLeftBottom && dataSetLeftBottom.missingDataCol.length > 0) {
    missingCols.push(dataSetLeftBottom.missingDataCol)
  }
  if (dataSetRight && dataSetRight.missingDataCol.length > 0) {
    missingCols.push(dataSetRight.missingDataCol)
  }

  if (missingCols) {
    missingGeneralColumn.push({
      time: time,
      missingCols: missingCols,
    })
  }

  const filteredDatasetLeftTop = Object.keys(
    dataSetLeftTop?.dataSetObject,
  ).filter(
    (key) =>
      dataSetLeftTop.dataSetObject[key] === 1 ||
      dataSetLeftTop.dataSetObject[key] === '1',
  )
  const filteredDatasetLeftBottom = Object.keys(
    dataSetLeftBottom?.dataSetObject,
  ).filter(
    (key) =>
      dataSetLeftBottom.dataSetObject[key] === 1 ||
      dataSetLeftBottom.dataSetObject[key] === '1',
  )
  const filteredDatasetRight = Object.keys(dataSetRight?.dataSetObject).filter(
    (key) =>
      dataSetRight.dataSetObject[key] === 1 ||
      dataSetRight.dataSetObject[key] === '1',
  )

  const getDivs = (data, position) => {
    let dataColumns = []
    let labelSet = []
    return data.map((item) => {
      switch (position) {
        case 'LT':
          dataColumns = DataColumns.symptoResides.graphColumnsleftTop
          labelSet = DataColumns.symptoResides.graphNamesLeftTop
          break
        case 'LB':
          dataColumns = DataColumns.symptoResides.graphColumnsLeftBottom
          labelSet = DataColumns.symptoResides.graphNamesLeftBottom
          break
        case 'R':
          dataColumns = DataColumns.symptoResides.graphColumnsRight
          labelSet = DataColumns.symptoResides.graphNamesRight
          break
        default:
          break
      }
      const label = getDataDisplayName(item, dataColumns, labelSet)
      return label ? <div>{label}</div> : null
    })
  }

  const graph = (
    <div style={{ display: 'inline-block', textAlign: 'center' }}>
      <h2 style={{ color: '#666666' }}>Symptômes Résiduels</h2>
      <div className={Styles.bipolarityChart}>
        <div style={{ display: 'inline-block' }}>
          <div className={Styles.leftPartSymptoTop}>
            {getDivs(filteredDatasetLeftTop, 'LT')}
          </div>
          <div style={{ height: '30px' }}></div>
          <div className={Styles.leftPartSymptoBottom}>
            {getDivs(filteredDatasetLeftBottom, 'LB')}
          </div>
        </div>
        <svg height="220" width="240">
          <polygon
            points="20,10 200,90 20,170"
            className={Styles.polygonShape}
          />
          <text x="85" y="80" text-anchor="middle" fill="white" font-size="20">
            Symptômes
          </text>
          <text x="75" y="110" text-anchor="middle" fill="white" font-size="20">
            résiduels
          </text>
        </svg>
        <div className={Styles.rightPartSympto}>
          {getDivs(filteredDatasetRight, 'R')}
        </div>
      </div>
    </div>
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * The consommation substance for depression
 * @returns The special graph
 */
export const showConsommationsSubstancesGraph = ({ medicalData, time }) => {
  let missingGeneralColumn = []
  const dataSetLeft = getDataSetByDataNames(
    medicalData,
    time,
    DataColumns.assistv3.graphColumnsLeft,
  )
  const dataSetRight = getDataSetByDataNames(
    medicalData,
    time,
    DataColumns.assistv3.graphColumnsRight,
  )

  const dataSetMiddle = getDataSetByDataNames(
    medicalData,
    time,
    DataColumns.assistv3.graphColumnsMiddle,
  )

  let missingCols = []
  if (dataSetLeft) {
    missingCols.push(dataSetLeft.missingDataCol)
  }
  if (dataSetRight) {
    missingCols.push(dataSetRight.missingDataCol)
  }
  if (dataSetMiddle) {
    missingCols.push(dataSetMiddle.missingDataCol)
  }

  missingGeneralColumn.push({
    time: time,
    missingCols: missingCols,
  })

  const filteredDatasetLeft = Object.keys(dataSetLeft?.dataSetObject).filter(
    (key) =>
      dataSetLeft.dataSetObject[key] === 1 ||
      dataSetLeft.dataSetObject[key] === '1',
  )
  const filteredDatasetRight = Object.keys(dataSetRight?.dataSetObject).filter(
    (key) =>
      dataSetRight.dataSetObject[key] === 1 ||
      dataSetRight.dataSetObject[key] === '1',
  )
  const filteredDatasetMiddle = Object.keys(
    dataSetMiddle?.dataSetObject,
  ).filter(
    (key) =>
      dataSetMiddle.dataSetObject[key] === 1 ||
      dataSetMiddle.dataSetObject[key] === '1',
  )

  const getDivs = (data, position) => {
    let dataColumns = []
    let labelSet = []
    return data.map((item) => {
      switch (position) {
        case 'L':
          dataColumns = DataColumns.assistv3.graphColumnsLeft
          labelSet = DataColumns.assistv3.graphDataNamesLeft

          break
        case 'R':
          dataColumns = DataColumns.assistv3.graphColumnsRight
          labelSet = DataColumns.assistv3.graphDataNamesRight
          break
        case 'O':
          dataColumns = [DataColumns.assistv3.graphColumnsMiddle[0]]
          labelSet = [DataColumns.assistv3.graphDataNamesMiddle[0]]
          break
        case 'B':
          dataColumns = [DataColumns.assistv3.graphColumnsMiddle[1]]
          labelSet = [DataColumns.assistv3.graphDataNamesMiddle[1]]
          break
        default:
          break
      }
      const label = getDataDisplayName(item, dataColumns, labelSet)
      return label ? <div>{label}</div> : null
    })
  }

  const graph = (
    <div style={{ display: 'inline-block', textAlign: 'center' }}>
      <h2>Consommation de Substance (ASSIST V3)</h2>
      <div className={Styles.bipolarityChart}>
        <div className={Styles.leftPartConsom}>
          {getDivs(filteredDatasetLeft, 'L')}
        </div>
        <div style={{ dispaly: 'flex' }}>
          <div className={Styles.topPart}>
            {getDivs(filteredDatasetMiddle, 'O')}
          </div>
          <svg height="220" width="250">
            <polygon
              points="100,0 180,0 230,50 230,100 180,150 100,150, 50,100 50,50"
              className={Styles.polygonShape}
            />
            <text
              x="140"
              y="80"
              text-anchor="middle"
              fill="white"
              font-size="20"
            >
              Substances
            </text>
          </svg>
          <div className={Styles.bottomPart}>
            {getDivs(filteredDatasetMiddle, 'B')}
          </div>
        </div>
        <div className={Styles.rightPartConsom}>
          {getDivs(filteredDatasetRight, 'R')}
        </div>
      </div>
    </div>
  )

  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
  })
}
