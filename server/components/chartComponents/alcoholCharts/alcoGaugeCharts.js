import { getDataByName } from '../../../lib/datalib/parseData'
import { GaugeChart } from '../basicCharts/gaugeChart'
import { DataColumns, ScoreSegmentLabels } from '../../../models/dataset'
// import { emptyValue, showGraph } from 'antd'
import Styles from '../chartcomponents.module.css'
import {
  getMissingDataColumn,
  showGraph,
  emptyValue,
} from '../../componentsUtils/visualizationGraph'

/**
 *
 * @param {Object} medicalData - the medical data
 * @param {boolean} withColor - the gauge chart background color
 * @param {String} dataName - the data name
 * @param {boolean} showGaugeTitle - show the title of the graph
 * @returns The gauge graph for insomine data
 */
export const alcoInsomnieGauge = ({
  medicalData,
  time,
  withColor,
  dataName,
  patientName,
  showGaugeTitle,
}) => {
  let missingTotalColumn = []
  const data = getDataByName(
    medicalData,
    DataColumns.isi.columns[0],
    time,
    patientName,
  )
  if (emptyValue(data)) {
    missingTotalColumn.push({
      time: time,
      missingCols: [DataColumns.isi.columns[0]],
    })
  }

  const graph = (
    <div>
      <div>
        {showGaugeTitle ? (
          <h2 className={Styles.evolutionLabel}>Insomnie (ISI)</h2>
        ) : null}
      </div>
      {
        <GaugeChart
          medicalData={data}
          scoreLabels={[
            ScoreSegmentLabels.absente,
            ScoreSegmentLabels.léger,
            ScoreSegmentLabels.modéré,
            ScoreSegmentLabels.sévère,
          ]}
          dataName={dataName}
          segmentStops={[0, 7.5, 14.5, 21.5, 28]}
          maxValue={28}
          withColor={withColor}
        />
      }
    </div>
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
  })
}

/**
 * The trouble usage alcool data
 * @param {String} time - the time step
 * @returns The gauge chart
 */
export const showTroubleUsageAlcoGauge = ({
  medicalData,
  time,
  withColor,
  dataName,
  patientName,
  showGaugeTitle,
}) => {
  let missingTotalColumn = []
  const data = getDataByName(
    medicalData,
    DataColumns.dsm.columns[0],
    time,
    patientName,
  )

  if (emptyValue(data)) {
    missingTotalColumn.push({
      time: time,
      missingCols: [DataColumns.dsm.columns[0]],
    })
  }

  const graph = (
    <div>
      {showGaugeTitle ? (
        <h2 className={Styles.evolutionLabel}>
          {`Trouble de L'usage de l'alcool(DSM-5)`}
        </h2>
      ) : null}
      <div>
        <GaugeChart
          medicalData={data}
          scoreLabels={[
            ScoreSegmentLabels.absente,
            ScoreSegmentLabels.léger,
            ScoreSegmentLabels.modéré,
            ScoreSegmentLabels.sévère,
          ]}
          dataName={dataName}
          segmentStops={[0, 2, 3, 6, 11]}
          maxValue={11}
          withColor={withColor}
        />
      </div>
    </div>
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
  })
}
