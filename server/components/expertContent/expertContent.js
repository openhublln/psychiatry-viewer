import React, { useState } from 'react'
import { Layout } from 'antd'
import Styles from './expertcontent.module.css'
import PatientContent from './patientContent/patientContent'
import SidebarControl from './siderBarComponent/siderbarControl'
import { GraphType } from '../../models/dataset'

const { Content } = Layout

/**
 * The main component for displaying the visualization graph
 */
const ExpertContent = (props) => {
  const [view, setView] = useState('interview')
  const [patientData, setPatientData] = useState()
  const [disease, setDisease] = useState(GraphType.alcohol)
  const [viewType, setViewType] = useState()

  const setSelectedPatient = (pd, viewType) => {
    if (pd) {
      setPatientData(pd)
      setView('interviewData')
      setViewType(viewType)
    } else {
      setPatientData(null)
      setView('interview')
      setViewType(viewType)
    }
  }

  return (
    <>
      <Content className={Styles.expertContent}>
        <PatientContent
          visible={view === 'interview'}
          setPatientData={setSelectedPatient}
          setDisease={setDisease}
          isExpert={props.isExpert}
          isInterview={props.isInterview}
          disease={disease}
          user={props.user}
        />
        <SidebarControl
          visible={view === 'interviewData'}
          setPatientData={setSelectedPatient}
          patientData={patientData}
          isExpert={props.isExpert}
          isInterview={props.isInterview}
          disease={disease}
          viewType={viewType}
          user={props.user}
        />
      </Content>
    </>
  )
}

export default ExpertContent
