import { getDataByName } from '../../../lib/datalib/parseData'
import { showGraph, emptyValue, getMissingDataColumn } from '../../componentsUtils/visualizationGraph'
import { GaugeChart } from '../basicCharts/gaugeChart'
import { DataColumns, ScoreSegmentLabels } from '../../../models/dataset'
import { Space } from 'antd'
import Styles from '../chartcomponents.module.css'
import {
  getNormalizedValue,
  getGraduationValue,
} from '../../../lib/datalib/calculateData'
/**
 * The depression data
 * @returns The gauge chart for depression data
 */
export const showDepressionGauge = ({
  medicalData,
  time,
  withColor,
  dataName,
  patientName,
}) => {
  let missingTotalColumn = []
  const data = getDataByName(
    medicalData,
    DataColumns.phq9.columns[0],
    time,
    patientName,
  )

  if (emptyValue(data)) {
    missingTotalColumn.push({
      time: time,
      missingCols: [DataColumns.phq9.columns[0]],
    })
  }

  const graph = (
    <div style={{ width: 'fit-content' }}>
      <h2 className={Styles.evolutionLabel}>Dépression (PHQ9)</h2>
      <div>
        {
          <GaugeChart
            medicalData={data}
            scoreLabels={[
              ScoreSegmentLabels.absente,
              ScoreSegmentLabels.léger,
              ScoreSegmentLabels.modéré,
              ScoreSegmentLabels.modsévère,
              ScoreSegmentLabels.sévère,
            ]}
            dataName={dataName}
            segmentStops={[0, 4.5, 9.5, 14.5, 19.5, 27]}
            maxValue={27}
            withColor={withColor}
          />
        }
      </div>
    </div>
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
  })
}

/**
 * Display the anxiety data for depression or alcool
 * @returns The anxiety data in gauge chart
 */
export const showAnxietyGauge = ({
  medicalData,
  time,
  withColor,
  dataName,
}) => {
  let missingTotalColumn = []
  const data = getDataByName(
    medicalData,
    DataColumns.gad7.columns[0],
    time,
    medicalData.name,
  )

  if (emptyValue(data)) {
    missingTotalColumn.push({
      time: time,
      missingCols: [DataColumns.gad7.columns[0]],
    })
  }

  const graph = (
    <div>
      <h2 className={Styles.evolutionLabel}>Anxiété (GAD7)</h2>
      <div>
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
            segmentStops={[0, 4.5, 9.5, 14.5, 21]}
            maxValue={21}
            withColor={withColor}
          />
        }
      </div>
    </div>
  )
  return showGraph({
    missingTotalColumn: missingTotalColumn,
    graph: graph,
  })
}

/**
 * Display auto-efficacity data
 * @returns The gauge graph
 */
export const autoEfficacityGauge = ({
  medicalData,
  time,
  withColor,
  dataName,
}) => {
  let missingTotalColumn = []
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
  console.log(data[0]['value'])
  const missingTotalDataColumn = getMissingDataColumn(data, time)

  const graph = (
    <div style={{ width: 'fit-content' }}>
      <div>
        <h2 className={Styles.evolutionLabel}>
          Auto-Efficacité (GSES): Evolution
        </h2>
      </div>
      {
        <GaugeChart
          medicalData={data[0]['value']}
          scoreLabels={['', '']}
          dataName={dataName}
          segmentStops={[0, 50, 100]}
          maxValue={100}
          withColor={withColor}
        />
      }
    </div>
  )
  return showGraph({
    missingTotalColumn: missingTotalDataColumn,
    graph: graph,
  })
}

/**
 * @returns Display reseau social gauge chart
 */
export const showReseauSocialGauge = ({ medicalData, temps }) => {
  let missingGeneralColumn = []
  const quantity = getDataByName(
    medicalData,
    DataColumns.ssq6.columns[0],
    temps[0],
    medicalData.name,
  )
  const quality = getDataByName(
    medicalData,
    DataColumns.ssq6.columns[1],
    temps[0],
    medicalData.name,
  )

  let missingCols = []
  if (emptyValue(quantity)) {
    missingCols.push(DataColumns.ssq6.columns[0])
  }
  if (emptyValue(quality)) {
    missingCols.push(DataColumns.ssq6.columns[1])
  }

  missingGeneralColumn.push({ time: temps[0], missingCols: missingCols })
  const graph = (
    <Space direction="vertical">
      <div>
        {
          <h2 className={Styles.evolutionLabel}>
            {'Le soutien social (SSQ6)'}
          </h2>
        }
      </div>
      <Space direction="horizonal">
        <GaugeChart
          medicalData={quantity}
          scoreLabels={[
            ScoreSegmentLabels.nothing,
            ScoreSegmentLabels.populationgeneral,
            ScoreSegmentLabels.nothing,
          ]}
          dataName={'Disponiblité'}
          segmentStops={[0, 20, 20.6, 54]}
          maxValue={54}
          withColor={false}
          index={0}
          segmentColors={['#ADD8E6', '#FF0000', '#ADD8E6']}
        />
        <GaugeChart
          medicalData={quality}
          scoreLabels={[
            ScoreSegmentLabels.nothing,
            ScoreSegmentLabels.populationgeneral,
            ScoreSegmentLabels.nothing,
          ]}
          dataName={'Satisfaction'}
          segmentStops={[0, 29, 29.4, 36]}
          maxValue={36}
          withColor={false}
          index={1}
          segmentColors={['#90ee90', '#FF0000', '#90ee90']}
        />
      </Space>
    </Space>
  )
  return showGraph({
    missingGeneralColumn: missingGeneralColumn,
    graph: graph,
  })
}
