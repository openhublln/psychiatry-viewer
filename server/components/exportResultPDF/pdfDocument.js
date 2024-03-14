import React from 'react'
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from '@react-pdf/renderer'
import PDFTable from './pdfTable'

/**
 * The PDF document
 */
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  commentViewBox: {
    height: '120px',
    width: '90%',
    marginTop: '2px',
    marginBottom: '10px',
    marginLeft: '5%',
    border: '1pt solid blue',
    padding: '10px',
  },
  commentText: {
    color: 'blue',
    fontSize: '12px',
    marginBottom: '5px',
  },
  pdfTitle: {
    marginTop: '20px',
    marginLeft: '22%',
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  graphView: {
    marginLeft: '15%',
    alignContent: 'center',
    marginBottom: '10px',
    width: '65%',
    height: '240px',
    border: '1pt solid #D3D3D3',
    textAlign: 'center',
  },
  graphWarning: {
    color: 'red',
    fontSize: '13px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

const getCurrentData = () => {
  var today = new Date()
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  return date
}

const MyFixedHeader = ({
  hospitalizationUnity,
  dateHospitalisation,
  patientName,
  patientDateNaissance,
}) => {
  const headerData = {
    items1: [
      {
        label: "Mon unité d'hospitalisation:",
      },
      {
        label: patientName,
      },
      {
        label: "Mes dates d'hospitalisation:",
      },
    ],
    items2: [
      {
        label: hospitalizationUnity,
      },
      {
        label: patientDateNaissance,
      },
      {
        label: dateHospitalisation,
      },
    ],
  }

  return (
    <View style={styles.tableContainer}>
      <PDFTable data={headerData} />
    </View>
  )
}

const showVisualizationImage = (imageDataURL) => {
  if (imageDataURL) {
    return (
      <View style={styles.graphView}>
        <Image alt="" src={imageDataURL} style={{ margin: '1px' }} />
      </View>
    )
  } else {
    return (
      <View style={styles.graphView}>
        <Text style={styles.graphWarning}>Warning: No graph to show!</Text>
      </View>
    )
  }
}

const MyFoot = ({ userName = '' }) => {
  return (
    <View>
      <View style={{ marginTop: '10px' }}>
        <Text style={{ fontSize: '8px', textAlign: 'left', marginLeft: '5%' }}>
          {`Imprimé le ${getCurrentData()} par [${userName}]`}
        </Text>
        <Text
          style={{ fontSize: '8px', marginLeft: '85%' }}
        >{`Page 1 sur 1`}</Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: '9px',
            textAlign: 'left',
            marginBottom: '10px',
            marginLeft: '5%',
          }}
        >
          PSee ©2022 Created by UCLouvain ICTEAM/IoNS
        </Text>
      </View>
    </View>
  )
}

const PDFDocument = ({
  hospitalizationUnity,
  dateHospitalisation,
  patientName,
  patientDateNaissance,
  comment,
  imageDataURLs,
  userName,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <MyFixedHeader
            hospitalizationUnity={hospitalizationUnity}
            dateHospitalisation={dateHospitalisation}
            patientName={patientName}
            patientDateNaissance={patientDateNaissance}
          />
          <View style={styles.pdfTitle}>
            <Text>Quelques points de réflexion</Text>
          </View>
          <Text
            style={{
              marginTop: '20px',
              marginLeft: '5%',
              fontSize: '12px',
              marginBottom: '3px',
              color: 'blue',
            }}
          >
            Commentaires:
          </Text>
          <View style={styles.commentViewBox}>
            <Text
              style={{
                color: 'black',
                fontSize: '9px',
                padding: '2px',
              }}
            >
              {comment}
            </Text>
          </View>
          <Text
            style={{
              marginLeft: '5%',
              fontSize: '12px',
              marginBottom: '3px',
              color: 'blue',
            }}
          >
            Résumés
          </Text>
          <View>{showVisualizationImage(imageDataURLs[0])}</View>
          <View>{showVisualizationImage(imageDataURLs[1])}</View>
          <MyFoot userName={userName} />
        </View>
      </Page>
    </Document>
  )
}
export default PDFDocument
