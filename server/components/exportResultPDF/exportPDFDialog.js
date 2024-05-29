import React from 'react'
import { Button, Modal, Space, TreeSelect, SHOW_PARENT } from 'antd'
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
      // value: undefined, // ! TreeSelect value (this is what we are looking for, keys that can be passed to componentsSwitchByDisease() to get the corresponding graph)
      // selectedNodes: [], // Selected nodes in TreeSelect
      value: this.props.value,
      selectedNodes: this.props.selectedNodes,
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
    // let visibleElement = imageElement.cloneNode(true)
    // visibleElement.style.visibility = 'visible'
    console.log("imageElement:", imageElement)
    // console.log("visibleElement:", visibleElement)
    const imageDataURLs = []
    console.log("loop on each graph that should have been retrieved: ")
    for (const graphElement of imageElement.childNodes) {
      // TODO create an "id: chart component" key-value obj to easily retrieve the selected chart(s)
      console.log("graphElement: ", graphElement)
      // ! HTML2CANVAS REQUIRES A NODE FROM THE DOM OF THE PAGE ITS LOADED ON (cf. https://stackoverflow.com/a/65632648)
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

  // handleTreeSelectChange = (value, label, extra) => {
  //   console.log('value', value);
  //   console.log('label', label);
  //   console.log('extra', extra);
  //   console.log('extra.allCheckedNodes', extra.allCheckedNodes);
  //   this.setState({
  //     value: value,
  //     selectedNodes: extra.allCheckedNodes,
  //   });
  // }

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
    const { treeSelectValue, onTreeSelectChange, graphs } = this.props;
    // TODO generate treeData dynamically based on the current view (alcohol/depression, patient/expert ?)
    // TODO populate key and/or value to match each corresponding chart identifiers
    const treeData = this.state.graphType == GraphType.alcohol ? [
      {
        title: 'Select/Unselect all',
        value: '0',
        key: '0',
        // ! children here should be dynamically generated
        children: [
          {
            title: 'Echelles liées aux consommations',
            value: "sub1",
            key: "sub1",
            children: [
              {
                title: "La sévérité du trouble d'usage de l'alcool",
                value: "troubleAlcohol",
                key: "troubleAlcohol",
                children: [
                  {
                    title: "À l'admission",
                    value: "troubelUsageAlcoBar",
                    key: "troubelUsageAlcoBar",
                  }
                ],
              },
              {
                title: 'Le craving',
                value: 'craving',
                key: 'craving',
                children: [
                  {
                    title: "À l'admission",
                    value: "cravingBar",
                    key: "cravingBar",
                  },
                  {
                    title: "Évolution",
                    value: "alcoCravingEvolution",
                    key: "alcoCravingEvolution",
                  }
                ],
              },
              {
                title: 'Les autres consommations',
                value: "autreConsom",
                key: "autreConsom",
                children: [
                  {
                    title: "À l'admission",
                    value: "alcoAutresConsommationBar",
                    key: "alcoAutresConsommationBar",
                  }
                ],
              }
            ],
          },
          {
            title: 'Comorbidités',
            value: "sub2",
            key: "sub2",
            children: [
              {
                title: 'Les symptômes dépressifs',
                value: "symDepression",
                key: "symDepression",
                children: [
                  {
                    title: "À l'admission",
                    value: "alcoDepressionBar",
                    key: "alcoDepressionBar",
                  },
                  {
                    title: "Évolution",
                    value: "alcoDepressionEvolution",
                    key: "alcoDepressionEvolution",
                  }
                ],
              },
              {
                title: 'Les symptômes anxieux',
                value: "anxieux",
                key: "anxieux",
                children: [
                  {
                    title: "À l'admission",
                    value: "anxietyBar",
                    key: "anxietyBar",
                  },
                  {
                    title: "Évolution",
                    value: "alcoAnxietyEvolution",
                    key: "alcoAnxietyEvolution",
                  }
                ],
              },
              {
                title: 'Les troubles du sommeil',
                value: "insomnie",
                key: "insomnie",
                children: [
                  {
                    title: "À l'admission",
                    value: "alcoInsomnieBar",
                    key: "alcoInsomnieBar",
                  },
                  {
                    title: "Évolution",
                    value: "alcoInsomnieEvolution",
                    key: "alcoInsomnieEvolution",
                  }
                ],
              }
            ],
          },
          {
            title: 'Modes de réaction face à un évènement',
            value: "sub3",
            key: "sub3",
            children: [
              {
                title: "L'impulsivité",
                value: "impulsivity",
                key: "impulsivity",
                children: [
                  {
                    title: "À l'admission",
                    value: "impulsivityRadar",
                    key: "impulsivityRadar",
                  }
                ],
              },
              {
                title: 'La gestion des émotions',
                value: "regEmotion",
                key: "regEmotion",
                children: [
                  {
                    title: "À l'admission",
                    value: "regulationEmotionBarBlance",
                    key: "regulationEmotionBarBlance",
                  }
                ],
              }
            ],
          },
          {
            title: 'Soutiens possibles',
            value: "sub4",
            key: "sub4",
            children: [
              {
                title: "Interne: L'auto-efficacité",
                value: "autoEfficacité",
                key: "autoEfficacité",
                children: [
                  {
                    title: "À l'admission",
                    value: "autoEfficacitybar",
                    key: "autoEfficacitybar",
                  },
                  {
                    title: "Évolution",
                    value: "autoEfficacityEvolutionLine",
                    key: "autoEfficacityEvolutionLine",
                  }
                ],
              },
              {
                title: "Interne: La motivation et préparation au changement",
                value: "prepareChange",
                key: "prepareChange",
                children: [
                  {
                    title: "À l'admission",
                    value: "MotivationChangementBar",
                    key: "MotivationChangementBar",
                  }
                ],
              },
              {
                title: "Externe: Réseau social",
                value: "exReseauSocial",
                key: "exReseauSocial",
                children: [
                  {
                    title: "Quantitatif et qualitatif",
                    value: "reseauSocialGauge",
                    key: "reseauSocialGauge",
                  }
                ],
              },
              {
                title: "Externe: Alliance thérapeutique",
                value: "AllianceThéra",
                key: "AllianceThéra",
                children: [
                  {
                    title: "Ressentie en fin d'hospitalisation",
                    value: "externeAllianceTherapBar",
                    key: "externeAllianceTherapBar",
                  }
                ],
              }
            ],
          },
          {
            title: 'La cognition',
            value: "cognition",
            key: "cognition",
            children: [
              {
                title: "En fin d'hospitalisation",
                value: "alcoCongnitionBar",
                key: "alcoCongnitionBar",
              }
            ],
          },
          {
            title: 'Histoire infantile et familiale',
            value: "historyInfFam",
            key: "historyInfFam",
            children: [
              {
                title: "La charge du passé",
                value: "infFamilieRadar",
                key: "infFamilieRadar",
              }
            ],
          },
          {
            title: 'Qualité de vie',
            value: 'qualityVie',
            key: 'qualityVie', // ! modified, had the same key as its child graph ("alcoQualityVieBar") but should be different (e.g. "alcoQualityVie") ?
            children: [
              {
                title: 'La qualité de vie',
                value: "alcoQualityVieBar",
                key: "alcoQualityVieBar",
              }
            ],
          },
          {
            title: 'Résumé',
            value: "sub8",
            key: "sub8",
            children: [
              {
                title: 'Les évolutions',
                value: "evolutions",
                key: "evolutions",
                children: [
                  {
                    title: "Avant et après le sevrage",
                    value: "alcoResumeEvolutionsRadar",
                    key: "alcoResumeEvolutionsRadar",
                  }
                ],
              },
              {
                title: 'Les forces et fragilités',
                value: "forcesFrag",
                key: "forcesFrag",
                children: [
                  {
                    title: "Où agir",
                    value: "alcoForceFragilityRadar",
                    key: "alcoForceFragilityRadar",
                  }
                ],
              }
            ],
          }
        ]
      },
    ] : [
      {
        title: 'Select/Unselect all',
        value: '0',
        key: '0',
        // ! children here should be dynamically generated (ideally ? maybe not ?)
        children: [
          {
            title: "Les caracteristiques de l'épisode", 
            value: "sub1",
            key: "sub1",
            children: [
              {
                title: "L'intensité de la dépression",
                value: "inteDepressionExpert",
                key: "inteDepressionExpert",
                children: [
                  {
                    title: "À l'admission",
                    value: "interDepressionBar",
                    key: "interDepressionBar",
                  },
                  {
                    title: "Évolution",
                    value: "interDepressionEvolution",
                    key: "interDepressionEvolution",
                  }
                ],
              },
              {
                title: 'La réactivité émotionnelle',
                value: 'reactiviteEmo',
                key: 'reactiviteEmo',
                children: [
                  {
                    title: "À l'admission",
                    value: "reactiviteEmoBar",
                    key: "reactiviteEmoBar",
                  },
                  {
                    title: "Évolution",
                    value: "reactiviteEmoEvolutionLine",
                    key: "reactiviteEmoEvolutionLine",
                  }
                ],
              },
              {
                title: 'Les indices de bipolarité',
                value: "IndBipolar",
                key: "IndBipolar",
                children: [
                  {
                    title: "Évolution",
                    value: "indicesBipolarityGraphExpert",
                    key: "indicesBipolarityGraphExpert",
                  }
                ],
              }
            ],
          },
          {
            title: 'Comorbidités',
            value: "sub2",
            key: "sub2",
            children: [
              {
                title: "L'anxiété",
                value: "anxiety",
                key: "anxiety",
                children: [
                  {
                    title: "À l'admission",
                    value: "anxietyBar",
                    key: "anxietyBar",
                  },
                  {
                    title: "Évolution",
                    value: "dpAnxietyEvolution",
                    key: "dpAnxietyEvolution",
                  }
                ],
              },
              {
                title: "L'insomnie",
                value: "insomnie",
                key: "insomnie",
                children: [
                  {
                    title: "À l'admission",
                    value: "insomnieBar",
                    key: "insomnieBar",
                  },
                  {
                    title: "Évolution",
                    value: "insomnieEvolution",
                    key: "insomnieEvolution",
                  }
                ],
              },
              {
                title: "L'hypersomnolence",
                value: "hypersom",
                key: "hypersom",
                children: [
                  {
                    title: "À l'admission",
                    value: "hypersomnolenceBar",
                    key: "hypersomnolenceBar",
                  },
                  {
                    title: "Évolution",
                    value: "hypersomnolenceEvolution",
                    key: "hypersomnolenceEvolution",
                  }
                ],
              },
              {
                title: "Les consommations",
                value: "consommations",
                key: "consommations",
                children: [
                  {
                    title: "À l'admission",
                    value: "consommationsSubstancesBar",
                    key: "consommationsSubstancesBar",
                  },
                  {
                    title: "Statistique",
                    value: "consommationsSubstancesTable",
                    key: "consommationsSubstancesTable",
                  }
                ],
              }
            ],
          },
          {
            title: 'Modes de fonctionnement',
            value: "sub3",
            key: "sub3",
            children: [
              {
                title: "L'impulsivité",
                value: "impulsivity",
                key: "impulsivity",
                children: [
                  {
                    title: "Évolution",
                    value: "impulsivityRadar",
                    key: "impulsivityRadar",
                  }
                ],
              },
              {
                title: 'La gestion des émotions',
                value: "gestionEmotion",
                key: "gestionEmotion",
                children: [
                  {
                    title: "À l'admission",
                    value: "regulationEmotionBarBlance",
                    key: "regulationEmotionBarBlance",
                  }
                ],
              }
            ],
          },
          {
            title: 'Soutiens',
            value: "sub4",
            key: "sub4",
            children: [
              {
                title: "Interne: L'auto-efficacité",
                value: "autoEfficacity",
                key: "autoEfficacity",
                children: [
                  {
                    title: "À l'admission",
                    value: "autoEfficacityBar",
                    key: "autoEfficacityBar",
                  }
                ],
              },
              {
                title: "Externe: Réseau social",
                value: "reseauSocial",
                key: "reseauSocial",
                children: [
                  {
                    title: "Quantitatif et qualitatif",
                    value: "dpReseauSocialBar",
                    key: "dpReseauSocialBar",
                  }
                ],
              },
              {
                title: "Externe: Alliance thérapeutique",
                value: "AllianceTherap",
                key: "AllianceTherap",
                children: [
                  {
                    title: "Ressenti en fin d'hospitalisation",
                    value: "externeAllianceTherapBar",
                    key: "externeAllianceTherapBar",
                  }
                ],
              }
            ],
          },
          {
            title: 'Histoire personnelle',
            value: "sub5",
            key: "sub5",
            children: [
              {
                title: "Évènements stressants de l'enfance",
                value: "infFamilieRadar",
                key: "infFamilieRadar",
              }
            ],
          },
          {
            title: 'Résumé',
            value: "sub6",
            key: "sub6",
            children: [
              {
                title: 'Prévention de la rechute',
                value: "forceFragility",
                key: "forceFragility",
                children: [
                  {
                    title: "Évolution",
                    value: "dpForceFragilityRadar",
                    key: "dpForceFragilityRadar",
                  }
                ],
              },
              {
                title: 'Les symptômes résiduels',
                value: "symptomesResiduels",
                key: "symptomesResiduels",
                children: [
                  {
                    title: "Évolution",
                    value: "dpSymptomesResiduelGraph",
                    key: "dpSymptomesResiduelGraph",
                  }
                ],
              }
            ],
          }
        ]
      },
    ];
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
                {`Mes dates d'hospitalisation:`}
                <input
                  type="date"
                  value={this.state.dateHospitalisation}
                  onChange={this.handleDateHospitalisationChange}
                  style={{ width: '300px', marginLeft: '10px' }}
                />
              </label>
            </div>
            <div className="patienData" style={{ display: 'flex' }}>
              <label style={{ color: 'blue' }}>
                Nom/Prénom:
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

            {/* <Select>
            </Select> */}
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={treeSelectValue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Veuillez sélectionner les données à exporter"
                allowClear
                treeCheckable
                treeDefaultExpandedKeys={['0']}
                maxTagCount={3}
                showCheckedStrategy={SHOW_PARENT}
                // onChange={this.handleTreeSelectChange}
                onChange={(value) => onTreeSelectChange(value)}
                treeData={treeData}
              />

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
            {/* probably included in the rendered view for a PDF preview ? get rid of it if not required, as its displayed above charts which make hover unusable */}
            <div
              id="pdf-image-element"
              style={{
                // set position/visibility to preserve export dialog => instead of this solution, display it outside viewport to be invisible for actual user
                position: 'absolute',
                // visibility: 'hidden',
                zIndex: -1000,
                // marginLeft: '-10000px', // as-if it's not visible
                // position: 'relative',
                marginTop: '-150px',
                width: 'fit-content',
                marginInline: 'auto',
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
              {graphs.map((graph, index) => (
                <div key={index} style={{ width: 'min-content' }}>{graph}</div>
              ))}
            </div>
          </Space>
        </Modal>
      </div>
    )
  }
}

