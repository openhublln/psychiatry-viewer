import { Space } from 'antd'
import { showAlcoCravingBar } from '../alcoholCharts/alcoBarCharts'
import { GraphType } from '../../../models/dataset'
import Styles from '../chartcomponents.module.css'

/**
 * The evolution status for the alcool craving
 * @param {Object} medicalData = the retrieved medical data from REDCap
 * @param {Object} temps - two time steps in array
 * @returns
 */
export const showAlcoCravingEvolution = ({ medicalData, temps }) => {
  return (
    <Space direction="vertical">
      <h2 className={Styles.evolutionLabel}>Le Craving (OCDS): Évolution</h2>
      <Space direction="horizontal">
        <div style={{ alignSelf: 'center' }}>
          {showAlcoCravingBar({
            medicalData: medicalData,
            time: temps[0],
            dataName: 'À l\'admission',
            backgroundColor: '#dadada',
            noVisibleMissingDataDialog: false,
            graphType: GraphType.alcohol,
          })}
        </div>
        <div style={{ alignSelf: 'center' }}>
          {showAlcoCravingBar({
            medicalData: medicalData,
            time: temps[1],
            dataName: 'En fin d\'hospitalisation',
            backgroundColor: '#ffeeda',
            noVisibleMissingDataDialog: true,
            graphType: GraphType.alcohol,
          })}
        </div>
      </Space>
    </Space>
  )
}
