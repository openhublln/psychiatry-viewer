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
    paddingTop: 35,
    paddingHorizontal: 25,
    paddingBottom: 70,
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
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  graphView: {
    width: '65%',
    height: '240px',
    border: '1pt solid #D3D3D3',
    marginBottom: '10px',
    // marginLeft: '15%',
    // marginHorizontal: '20',
    alignItems:'center',
    // textAlign: 'center',
  },
  graphsView: {
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
  },
  graphWarning: {
    color: 'red',
    fontSize: '13px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fixedHeader: {
    width: '100%',
    marginVertical: 10,
  },
  fixedFooter: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    <View fixed style={styles.fixedHeader}>
      <PDFTable data={headerData} />
    </View>
  )
}

const showVisualizationImage = (imageDataURL) => {
  if (imageDataURL) {
    return (
      <Image src={imageDataURL} style={{ objectFit: 'scale-down', width: 'auto', height: 'auto' }} debug />
    )
  } else {
    return (
      <Text style={styles.graphWarning}>Warning: No graph to show!</Text>
    )
  }
}

const MyFoot = ({ userName = '' }) => {
  return (
    <View fixed style={styles.fixedFooter}>
      <View>
        <Text style={{ fontSize: '8px', textAlign: 'left', marginLeft: '5%' }}>
          {`Imprimé le ${getCurrentData()} par [${userName}]`}
        </Text>
        <Text
          style={{ fontSize: '8px', marginLeft: '85%' }}
          render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )}
        />
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


// ! SEE https://react-pdf.org/components FOR PDF-RELATED COMPONENTS AND THEIR PROPERTIES
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
      <Page size="A4">
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
        <View style={styles.graphsView}>
        {imageDataURLs.map((imageDataURL, index) => {
          return (
            // <Page key={index} debug orientation="portrait" size="A4" style={styles.page}>
            <View style={styles.graphView}>
              {showVisualizationImage(imageDataURL)}
            </View>
          )
        })}
        </View>
        <MyFoot userName={userName} />
      </Page>
    </Document>
  )
}
export default PDFDocument
