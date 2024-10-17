import React, { useEffect, useState } from 'react'
import { Layout, Menu, Button, Space } from 'antd'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { TiExport } from 'react-icons/ti'
import {
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
  // const [exportPDFDialogKey, setExportPDFDialogKey] = useState(0)

  const [treeSelectValue, setTreeSelectValue] = useState([]);
  const [graphs, setGraphs] = useState([]);

  const handleTreeSelectChange = (value) => {
    setTreeSelectValue(value);
    // Dynamically generate or filter graphs based on selected values
    const newGraphs = prepareExportGraphs(value);
    setGraphs(newGraphs);
  };

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

  const componentsSwitchByDisease = (selectedItem, doShowWarning) => {
    const medicalData = props.patientData
    const temps = getTemps(medicalData)
    console.log("MEDICAL DATA:", medicalData)
    switch (props.disease) {
      case GraphType.alcohol:
        console.log("alcool:", AlcoholSelect(selectedItem, medicalData, temps, doShowWarning))
        return AlcoholSelect(selectedItem, medicalData, temps, doShowWarning)
      case GraphType.depression:
        console.log("depression:", DepressionSelect(selectedItem, medicalData, temps, doShowWarning))
        return DepressionSelect(selectedItem, medicalData, temps, doShowWarning)
      default:
        break
    }
  }

  const onClick = (key) => {
    console.log('key: ', key)
    setSelectedItem(key)
  }

  // !
  const getSidebarItems = () => {
    const medicalData = props.patientData
    const temps = getTemps(medicalData)
    if (props.isExpert) {
      if (props.disease === GraphType.alcohol) {
        return props.viewType === ViewType.medicin
          ? AlcoholExpertSidebarItems(medicalData, temps)
          : AlcoholPatientSidebarItems
      } else if (props.disease === GraphType.depression) {
        return props.viewType === ViewType.medicin
          ? DepressionSidebarItemsExpert(medicalData, temps)
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

  // Function to open Modal
  const showModal = () => {
    setShowExportPDFDialog(true);
  };

  // Function to close Modal
  const handleCancel = () => {
    setShowExportPDFDialog(false);
  };

  // Function to prepare export graphs based on selected values
  const prepareExportGraphs = (selectedValues) => {
    let graphs = []
    for (let key of selectedValues) {
      graphs.push(
        componentsSwitchByDisease(
          key,
          false,
        )
      )
    }
    console.log("graphs:", graphs)
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
              onClick={() => showModal()}
              icon={React.createElement(TiExport)}
            >
              Export Result
            </Button>
          </Space>
          <Sider
            className="viewerSiderBar"
            width={320}
          >
            <Menu
              className={Styles.sideBarMenu}
              mode="inline"
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['']}
              items={getSidebarItems()}
              selectedKeys={selectedItem}
              onClick={(e) => onClick(e.key)}
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
        // key={exportPDFDialogKey}
        isModalVisible={showExportPDFDialog}
        handleCancel={handleCancel}
        userName={props.user.username}
        graphType={props.disease}
        graphs={graphs}
        onTreeSelectChange={handleTreeSelectChange}
        treeSelectValue={treeSelectValue}
      />
    </>
  ) : null
}

export default SidebarControl
