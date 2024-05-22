import React, { useEffect, useState } from 'react'
import { Layout, Menu, Button, Space } from 'antd'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { TiExport } from 'react-icons/ti'
import {
  AlcoholItemKeys,
  DepressionItemKeys,
  GraphType,
  ViewType,
} from '../../../models/dataset'
import { AlcoholSelect } from './alcoholSiderbar/alcoholSelect'
import { DepressionSelect } from './depressionSiderbar/depressionSelect'
import { DepressionSidebarItemsExpert } from './depressionSiderbar/sidebarItemsDepressionExpert'
import { DepressionSidebarItemsPatient } from './depressionSiderbar/sidebarItemsDepressionPatient'
import { AlcoholExpertSidebarItems } from './alcoholSiderbar/sidebarItemsAlcoholExpert'
import { AlcoholPatientSidebarItems } from './alcoholSiderbar/sidebarItemsAlcoholPatient'
import ExportPDFDialog from '../../exportResultPDF/exportPDFDialog'
import Styles from './siderbarcomponent.module.css'

const { Content, Sider } = Layout

const SidebarControl = (props) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [showExportPDFDialog, setShowExportPDFDialog] = useState(false)
  const [exportPDFDialogKey, setExportPDFDialogKey] = useState(0)

  useEffect(() => {
    setSelectedItem(null)
    setShowExportPDFDialog(false)
  }, [props.patientData, props.disease])

  const getTemps = (data) => {
    let temps = []

    // does data come from Excel/CSV file?
    if (Array.isArray(data.medicalData[0])) {
      const index = data.medicalData[0].findIndex((col) => {
        const c = col.trim().toLowerCase()
        return c === 'temps' || c === 'redcap_event_name'
      })

      if (index >= 0) {
        for (let i = 1; i < data.medicalData.length; i++) {
          temps.push(data.medicalData[i][index])
        }
      }
    } else {
      // data comes from redcap API
      temps = data.medicalData.map((md) => md.redcap_event_name)
    }

    return temps
  }

  // !
  const componentsSwitchByDisease = (selectedItem, doShowWarning) => {
    const medicalData = props.patientData
    const temps = getTemps(medicalData)

    switch (props.disease) {
      case GraphType.alcohol:
        return AlcoholSelect(selectedItem, medicalData, temps, doShowWarning)
      case GraphType.depression:
        return DepressionSelect(selectedItem, medicalData, temps, doShowWarning)
      default:
        break
    }
  }

  // ! TRIGGERED ON SIDEBAR ITEM CLICK
  const onClick = (key) => {
    console.log('key: ', key)
    setSelectedItem(key)
  }

  // ! DEFINES SIDEBAR ITEMS WHICH DEFINES CORRESPONDING GRAPHS TO SHOW FOR EACH VIEW BASED ON THEIR KEY (?)
  const getSidebarItems = () => {
    const medicalData = props.patientData
    const temps = getTemps(medicalData)
    if (props.isExpert) {
      if (props.disease === GraphType.alcohol) {
        return props.viewType === ViewType.medicin
          ? AlcoholExpertSidebarItems(medicalData, temps) // ? WHY DOES IT TAKES 2 PARAMETERS (while others don't) ?
          : AlcoholPatientSidebarItems
      } else if (props.disease === GraphType.depression) {
        return props.viewType === ViewType.medicin
          ? DepressionSidebarItemsExpert
          : DepressionSidebarItemsPatient
      } else {
        return null
      }
    } else {
      if (props.disease === GraphType.alcohol) {
        return AlcoholPatientSidebarItems
      } else if (props.disease === GraphType.depression) {
        return DepressionSidebarItemsPatient
      } else {
        return null
      }
    }
  }

  // ! TRIGGERED ON EXPORT RESULT BUTTON
  const handleExportResult = () => {
    setExportPDFDialogKey(exportPDFDialogKey + 1)
    setShowExportPDFDialog(true)
  }

  // !
  const prepareExportGraphs = () => {
    let graphs = []
    if (props.disease === GraphType.alcohol) {
      graphs.push(
        componentsSwitchByDisease(
          AlcoholItemKeys.alcoForceFragilityRadar,
          false,
        ),
      )
      graphs.push(
        componentsSwitchByDisease(
          AlcoholItemKeys.alcoResumeEvolutionsRadar,
          false,
        ),
      )
    } else {
      graphs.push(
        componentsSwitchByDisease(
          DepressionItemKeys.dpForceFragilityRadar,
          false,
        ),
      )
      graphs.push(
        componentsSwitchByDisease(
          DepressionItemKeys.dpSymptomesResiduelGraph,
          false,
        ),
      )
    }
    return graphs
  }

  return props.visible ? (
    <>
      <Content className={Styles.siderbarControl}>
        <Space direction="vertical">
          <Space direction="vertical">
            <Button
              className={Styles.patientlistBtn}
              onClick={() => props.setPatientData()}
              icon={<AiOutlineFileSearch style={{ fontSize: '22px' }} />}
            >
              Patient list
            </Button>
            <Button
              className={Styles.exportResultBtn}
              onClick={() => handleExportResult()}
              icon={React.createElement(TiExport)}
            >
              Export Result
            </Button>
          </Space>
          <Sider
            className="viewerSiderBar"
            style={
              {
                // background: colorBgContainer,
              }
            }
            width={320}
          >
            {/* TODO RETRIEVE SIDEBAR KEYS TO BE USED IN THE EXPORT SELECTION MENU? */}
            <Menu
              className={Styles.sideBarMenu}
              mode="inline"
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['']}
              items={getSidebarItems()}
              selectedKeys={selectedItem}
              onClick={(e) => onClick(e.key)} // triggers the onClick above
            />
          </Sider>
        </Space>
        <Space direction="vertical">
          <div className={Styles.viewerDiv}>
            {componentsSwitchByDisease(selectedItem, true)}
          </div>
        </Space>
      </Content>
      <ExportPDFDialog
        key={exportPDFDialogKey}
        visible={showExportPDFDialog}
        userName={props.user.username}
        graphType={props.disease}
        graphs={showExportPDFDialog ? prepareExportGraphs() : []}
      />
    </>
  ) : null
}

export default SidebarControl
