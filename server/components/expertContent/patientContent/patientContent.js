import React, { useState } from 'react'
import { Button, Layout, Radio, Space } from 'antd'
import { MdOutlineImageSearch } from 'react-icons/md'
import { PatientTable } from './patientTable'
import { GraphType } from '../../../models/dataset'

import Styles from './patientcontent.module.css'

// ******** api *****************************************
// Not use for now, but keep it
// async function getFileContentBase64(filePath) {
//   const response = await fetch(
//     '/api/data/file?' + new URLSearchParams({ path: filePath }),
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   )
//   if (response.status >= 400) {
//     throw new Error(response.statusText)
//   }
//   return (await response.json()).contentBase64
// }

/**
 * @returns Get the depression data from REDCap
 */
async function getDepressionData() {
  const response = await fetch('api/data/nrmmderecords', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status >= 400) {
    throw new Error(response.statusText)
  }
  return await response.json()
}

async function getAlcoholData() {
  const response = await fetch('api/data/nrmprecords', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status >= 400) {
    throw new Error(response.statusText)
  }
  return await response.json()
}

// *************************************
const { Content } = Layout

const PatientContent = (props) => {
  // const [selectedItem, setSelectedItem] = useState('patients')
  const [error, setError] = useState('')
  const [patients, setPatients] = useState([])
  // const dataBrowserDialogFunctions = {}

  // var isSelectDataFile
  // const handleLoadData = () => {
  //   isSelectDataFile = true
  //   dataBrowserDialogFunctions.setFilenameFilter(
  //     (filename) =>
  //       filename.endsWith('.xls') ||
  //       filename.endsWith('.xlsx') ||
  //       filename.endsWith('.csv'),
  //   )
  //   dataBrowserDialogFunctions.setMultiSelect(true)
  //   dataBrowserDialogFunctions.setPath('$datadir')
  //   dataBrowserDialogFunctions.setVisible(true)
  // }

  // const handleLoadResult = () => {
  //   isSelectDataFile = false
  //   dataBrowserDialogFunctions.setFilenameFilter((filename) =>
  //     filename.endsWith('.pdf'),
  //   )
  //   dataBrowserDialogFunctions.setMultiSelect(false)
  //   dataBrowserDialogFunctions.setPath('$resultdir')
  //   dataBrowserDialogFunctions.setVisible(true)
  // }

  const handleLoadAlcoholRecordList = async () => {
    try {
      const data = await getAlcoholData()
      setPatients(data.data)
      console.log('+++++++++++ alcohol data: ', data)
    } catch (error) {
      setError(error)
    }
  }

  const handleLoadDepressionRecordList = async () => {
    try {
      const data = await getDepressionData()
      setPatients(data.data)
    } catch (error) {
      setError(error)
    }
  }

  // const loadDataFile = async (fileNames) => {
  //   const patientData = []
  //   try {
  //     for (var i = 0; i < fileNames.length; i++) {
  //       const name = fileNames[i]
  //       const contentBase64 = await getFileContentBase64(name)
  //       const content = window.atob(contentBase64)
  //       if (name.endsWith('.xls') || name.endsWith('.xlsx')) {
  //         const binaryContent = Uint8Array.from(content, (c) => c.charCodeAt(0))
  //         const data = parseDataXLSX(binaryContent)
  //         data.filename = name
  //         patientData.push(...parsePatientDataXLSX(data))
  //       } else {
  //         const data = csvStringToArray(content)
  //         data.filename = name
  //         patientData.push(...parsePatientDataCSV(data))
  //       }
  //     }
  //     setPatients(patientData)
  //   } catch (error) {
  //     setError(error)
  //   }
  // }

  // const onFileSelected = (selectedFiles) => {
  //   if (isSelectDataFile) {
  //     loadDataFile(selectedFiles)
  //   } else {
  //     // selectedFiles is a list with a SINGLE pdf file
  //     // to do?
  //   }
  // }

  const openPatientData = (row, viewType) => {
    props.setPatientData(row.original, viewType)
  }

  return props.visible ? (
    <>
      <Content className={Styles.patientContent}>
        <Space direction="vertical">
          <Space direction="vertical">
            {/* <Button
              className={Styles.patientlistBtn}
              onClick={() => handleLoadData()}
              icon={<AiOutlineFileSearch style={{ fontSize: '22px' }} />}
            >
              Load Data File
            </Button> */}
            {/* <Button
              className={Styles.loadResultBtn}
              icon={<MdOutlineImageSearch style={{ fontSize: '22px' }} />}
              onClick={() => handleLoadResult()}
            >
              Load Result File
            </Button> */}
            <Button
              className={Styles.loadAlcoholDataBtn}
              icon={<MdOutlineImageSearch style={{ fontSize: '22px' }} />}
              onClick={() => handleLoadAlcoholRecordList()}
            >
              Load Alcohol Data
            </Button>
            <Button
              className={Styles.loadDepressionDataBtn}
              icon={<MdOutlineImageSearch style={{ fontSize: '22px' }} />}
              onClick={() => handleLoadDepressionRecordList()}
            >
              Load Depression Data
            </Button>
          </Space>
          <Radio.Group
            onChange={(e) => props.setDisease(e.target.value)}
            value={props.disease}
          >
            <Space direction="vertical" className={Styles.diseaseRadioBtns}>
              <Radio
                value={GraphType.alcohol}
                className={Styles.diseasBtn}
                style={{ fontSize: '20px' }}
              >
                Alcool
              </Radio>
              <Radio
                value={GraphType.depression}
                className={Styles.diseasBtn}
                style={{ fontSize: '20px' }}
              >
                Dépression
              </Radio>
            </Space>
          </Radio.Group>
        </Space>
        <div className="patientTableDiv" style={{ width: '98%' }}>
          {patients.length > 0 ? (
            <PatientTable
              patients={patients}
              onClickSelectPatient={(row, viewType, e) =>
                openPatientData(row, viewType, e)
              }
              isExpert={props.isExpert}
            />
          ) : (
            <h2 className={Styles.noLoadDataMessage}>
              Load the patient data from REDCap
            </h2>
          )}
          <h3 style={{ color: 'red' }}>{error.message ?? error}</h3>
        </div>
        {/* <div>
          <DataBrowserDialog
            className="dataBrowserDialog"
            onFilesSelected={(selectedFiles) => onFileSelected(selectedFiles)}
            dataBrowserDialogFunctions={dataBrowserDialogFunctions}
          />
        </div> */}
      </Content>
    </>
  ) : null
}

export default PatientContent
