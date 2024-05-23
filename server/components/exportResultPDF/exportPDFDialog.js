import React from 'react'
import { Button, Modal, Space } from 'antd'
import { GraphType } from '../../models/dataset'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import PDFDocument from './pdfDocument'
import Select from './Select'
import html2canvas from 'html2canvas'

/**
 * The dialogue for enter general information of the PDF file
 */
export default class ExportPDFDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: this.props.visible,
      graphType: this.props.graphType,
      title: this.props.title,
      hospitalizationUnity: '',
      dateHospitalisation: '',
      patientName: '',
      patientDateNaissance: '',
      comment: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible,
      })
    }
  }

  // !
  generatePdfDocument = async ({ fileName = '' }) => {
    console.log("==== INSIDE generatePdfDocument ====")
    const imageElement = document.getElementById('pdf-image-element')
    console.log("imageElement:", imageElement)

    const imageDataURLs = []
    console.log("loop on each graph that should have been retrieved: ")
    for (const graphElement of imageElement.childNodes) {
      console.log("graphElement: ", graphElement)
      const canvas = await html2canvas(graphElement, {
          width: graphElement.offsetWidth,
          height: graphElement.offsetHeight,
      })
      imageDataURLs.push(canvas.toDataURL())
    }

    console.log("imageDataURLs (supposedly) fulfilled: ", imageDataURLs)
    const blob = await pdf(
      <PDFDocument
        graphType={this.state.graphType}
        hospitalizationUnity={this.state.hospitalizationUnity}
        dateHospitalisation={this.state.dateHospitalisation}
        patientName={this.state.patientName}
        patientDateNaissance={this.state.patientDateNaissance}
        comment={this.state.comment}
        imageDataURLs={imageDataURLs}
        userName={this.props.userName}
      />,
    ).toBlob()
    saveAs(blob, fileName)
  }

  getGraphTypeName() {
    if (this.state.graphType === GraphType.alcohol) {
      return "Exporter les données de visualisation d'ALCOOL"
    } else {
      return 'Exporter les données de visualisation de DÉPRESSION'
    }
  }

  handleUserNameTextChange = (e) => {
    this.setState({
      userName: e.target.value,
    })
  }

  handleHospitalizationUnityTextChange = (e) => {
    this.setState({
      hospitalizationUnity: e.target.value,
    })
  }

  handleDateHospitalisationChange = (e) => {
    this.setState({ dateHospitalisation: e.target.value })
  }

  handlePatientNameChange = (e) => {
    this.setState({ patientName: e.target.value })
  }

  handlePatientDateNaissanceChange = (e) => {
    this.setState({
      patientDateNaissance: e.target.value,
    })
  }

  handleCommentTextChange = (e) => {
    this.setState({
      comment: e.target.value,
    })
  }

  onClose = (e) => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div className="exportPdfDialogDiv">
        <Modal
          className="exportPdfDialog"
          title={
            <h3
              style={{
                textAlign: 'center',
                backgroundColor: '#f1f1f1',
                color: '#b03608',
              }}
            >
              {this.getGraphTypeName()}
            </h3>
          }
          open={this.state.visible}
          closable={false}
          destroyOnClose={true}
          onOk={() =>
            this.generatePdfDocument({ // !
              fileName: `${this.state.graphType}_export_result.pdf`,
            })
          }
          onClose={() => this.onClose()}
          footer={[
            <Button key="ok" onClick={() => this.onClose()}>
              Close
            </Button>,
            <Button
              key="ok"
              onClick={() => // !
                this.generatePdfDocument({
                  fileName: `${this.state.graphType}_export_result.pdf`,
                })
              }
            >
              Save
            </Button>,
          ]}
          style={{
            width: '550px',
          }}
        >
          <Space direction="vertical">
            <div className="hospitalizationUnityDiv">
              <label
                className="hospitilizationUnitLabel"
                style={{ color: 'blue' }}
              >
                {`Mon unité d'hospitalisation:`}
                <input
                  type="text"
                  value={this.state.hospitalizationUnity}
                  onChange={this.handleHospitalizationUnityTextChange}
                  style={{ width: '300px', marginLeft: '8px' }}
                />
              </label>
            </div>
            <div className="dateHospitalisationDiv">
              <label
                className="dateHospitalisationLabel"
                style={{ color: 'blue' }}
              >
                {`Mes dates d'hospitalisation`}
                <input
                  type="date"
                  value={this.state.dateHospitalisation}
                  onChange={this.handleDateHospitalisationChange}
                  style={{ width: '300px', marginLeft: '12px' }}
                />
              </label>
            </div>
            <div className="patienData" style={{ display: 'flex' }}>
              <label style={{ color: 'blue' }}>
                Nom/Prenom:
                <input
                  type="text"
                  value={this.state.patientName}
                  onChange={this.handlePatientNameChange}
                  style={{ width: '240px' }}
                />
              </label>
              <label style={{ marginLeft: '10px', color: 'blue' }}>
                Date de naissance:
                <input
                  type="date"
                  value={this.state.patientDateNaissance}
                  onChange={this.handlePatientDateNaissanceChange}
                  style={{ width: '217px' }}
                />
              </label>
            </div>
            <div>
            <Select>

            </Select>
            </div>
            <div className="commentSpace">
              <label
                className="commentLabel"
                style={{
                  color: 'blue',
                  marginTop: '5px',
                  tetextDecorationLine: 'underline',
                }}
              >
                Commentaires:
              </label>
              <label
                style={{ marginLeft: '5px', color: 'red', fontSize: '13px' }}
              >
                Prévisualiser/Enregistrer le PDF, Fermer la boîte de dialogue,
                Le commentaire sera supprimé de la boîte de dialogue!
              </label>
              <textarea
                className="commentTextarea"
                value={this.state.comment}
                onChange={this.handleCommentTextChange}
                style={{
                  width: '500px',
                  height: '240px',
                  overflow: 'auto',
                  resize: 'none',
                }}
              />
            </div>
          </Space>
        </Modal>
        <div
          id="pdf-image-element"
          style={{
            zIndex: -1000,
            position: 'relative',
            marginTop: '-150px',
          }}
        >
          {/* ! graphs prop == result returned by prepareExportGraphs() in SidebarControl.js */}
          {/* {this.props.graphs.forEach((graph) => {
            if (graph) {
              console.log("graph: ", graph)
              return graph
            }
          })} */}
          {/* Use map to render the graphs */}
          {this.props.graphs.map((graph, index) => (
            <div key={index}>{graph}</div>
          ))}
        </div>
      </div>
    )
  }
}
