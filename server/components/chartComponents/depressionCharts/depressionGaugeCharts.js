import { getDataByName } from '../../../lib/datalib/parseData'
import { GaugeChart } from '../basicCharts/gaugeChart'
import { DataColumns, ScoreSegmentLabels } from '../../../models/dataset'
import { showGraph, emptyValue } from '../../componentsUtils/visualizationGraph'
import Styles from '../chartcomponents.module.css'

/**
 * @param {Object} medicalData - The retrieved medical data
 * @param {String} time - The time step
 * @param {String} withColor - the bakcground color
 * @param {dataName} dataName - The data name
 * @param {boolean} showGaugeTitle - dispaly the graph title
 */
export const showIsomnieGauge = ({
  medicalData,
  time,
  withColor,
  dataName,
  showGaugeTitle,
  doShowWarning,
}) => {
  let missingTotalColumn = []
  const data = getDataByName(
    medicalData,
    DataColumns.isi.columns[0],
    time,
    medicalData.name,
  )

  if (emptyValue(data)) {
    missingTotalColumn.push({
      time: time,
      missingCols: [DataColumns.isi.columns[0]],
    })
  }

  const graph = (
    <div style={{ width: 'fit-content' }}>
      {showGaugeTitle ? (
        <h2 className={Styles.evolutionLabel}>Insomnie (ISI)</h2>
      ) : null}
      <div>
        {
          <GaugeChart
            medicalData={data}
            scoreLabels={[
              ScoreSegmentLabels.absente,
              ScoreSegmentLabels.léger,
              ScoreSegmentLabels.modéré,
              // ScoreSegmentLabels.modsévèreSeperated,
              ScoreSegmentLabels.modsévère,
              ScoreSegmentLabels.sévère,
            ]}
            dataName={dataName}
            segmentStops={[0, 7.5, 8, 14, 21.5, 28]}
            maxValue={28}
            withColor={withColor}
          />
        }
      </div>
    </div>
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}

/**
 * @returns Display the hypersomnolence gauge graph
 */
export const showhypersomnolenceGauge = ({
  medicalData,
  time,
  withColor,
  dataName,
  patientName,
  showGaugeTitle,
  doShowWarning,
}) => {
  let missingTotalColumn = []
  const data = getDataByName(
    medicalData,
    DataColumns.hsi.columns[0],
    time,
    patientName,
  )
  if (emptyValue(data)) {
    missingTotalColumn.push({
      time: time,
      missingCols: [DataColumns.hsi.columns[0]],
    })
  }

  const graph = (
    <div style={{ width: 'fit-content' }}>
      {showGaugeTitle ? (
        <h2 className={Styles.evolutionLabel}>Hypersomnolence (HSI)</h2>
      ) : null}
      <div>
        {
          <GaugeChart
            medicalData={data}
            scoreLabels={[
              ScoreSegmentLabels.absente,
              ScoreSegmentLabels.presente,
            ]}
            dataName={dataName}
            segmentStops={[0, 9.5, 36]}
            maxValue={36}
            withColor={withColor}
          />
        }
      </div>
    </div>
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
    noVisible: !doShowWarning,
  })
}
