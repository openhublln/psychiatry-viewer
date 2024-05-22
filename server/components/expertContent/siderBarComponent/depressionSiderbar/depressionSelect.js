import { DepressionItemKeys } from '../../../../models/dataset'
import { showIsomnieLine } from '../../../chartComponents/generalCharts/generalLineCharts'
import {
  showAnxietyBar,
  showAutoEfficacitéBar,
  showExterneAllianceTherapBar,
  showRegulationEmotionBarBlance,
  showConsommationsSubstancesBar,
} from '../../../chartComponents/generalCharts/generalBarCharts'
import { showInterDepressionEvolutionLine } from '../../../chartComponents/generalCharts/generalLineCharts'
import {
  showImpulsivityRadar,
  showInfFamilieRadar,
} from '../../../chartComponents/generalCharts/generalRadarCharts'
import {
  showAnxietyGauge,
  autoEfficacityGauge,
  showReseauSocialGauge,
  showDepressionGauge,
} from '../../../chartComponents/generalCharts/generalGaugeCharts'

import {
  showIndicesBipolarityGraph,
  showSymptomesResiduelGraph,
  showConsommationsSubstancesGraph,
} from '../../../chartComponents/depressionCharts/depressionSpecialGraph'
import { depressionConsommationSubstanceTable } from '../../../chartComponents/depressionCharts/depressionConsommationSubstancesTable'
import {
  showReactivityEmotionelleBar,
  showInterDepressionBar,
  showIsomnieBar,
  showHypersomnolenceBar,
  showDepressionReseauSocialBar,
} from '../../../chartComponents/depressionCharts/depressionBarCharts'
import {
  showAnxietyLine,
  showHypersomnolenceLine,
  showReactiviteEmoEvolutionLine,
} from '../../../chartComponents/depressionCharts/depressionLineCharts'
import {
  showIsomnieGauge,
  showhypersomnolenceGauge,
} from '../../../chartComponents/depressionCharts/depressionGaugeCharts'
import {
  showDepressionForceFragilityRadar,
  showReactiviteEmoRadar,
} from '../../../chartComponents/depressionCharts/depressionRadarCharts'

// ************************* Depression ******************************
// ! RETRIEVE ALL GRAPHS - EVERY RETURNED OBJ LOOKS LIKE:
  // return showGraph({
  //   missingTotalColumn: missingTotalColumn,
  //   graph: graph,
  // })
  // ! WHERE "graph" IS A CUSTOM COMPONENT THAT LOOKS LIKE (i.e. a parent div containing a react-chartjs-2 component):
  // return (
  //   <div
  //     className="lineChartDiv"
  //     style={{
  //       width: chartWidth,
  //       height: chartHeight,
  //     }}
  //   >
  //     <Line key={JSON.stringify(dataSet)} data={dataSet} options={options} /> // ! this is the chartJS component (specifically, from react-chartjs-2 library)
  //   </div>
  // )

  // TODO - get reference to the react-chartjs-2 component and convert to base64
  // https://stackoverflow.com/questions/62039681/react-chartjs-2-doughnut-chart-export-to-png
export const DepressionSelect = (key, medicalData, temps, doShowWarning) => {
  switch (key) {
    case DepressionItemKeys.interDepressionBar:
      return showInterDepressionBar({
        medicalData: medicalData,
        time: temps[0],
      })
    case DepressionItemKeys.depressionGauge:
      return showDepressionGauge({
        medicalData: medicalData,
        time: temps[1],
        withColor: true,
        dataName: "À l'admission",
        patientName: medicalData.name,
      })
    case DepressionItemKeys.interDepressionEvolution:
      return showInterDepressionEvolutionLine({
        medicalData: medicalData,
        temps: [temps[0], temps[1]],
        dataName: 'Dépression (PHQ9) : Évolution',
      })
    // Insomnie
    case DepressionItemKeys.insomnieBar:
      return showIsomnieBar({ medicalData: medicalData, time: temps[0] })
    case DepressionItemKeys.insomnieGauge:
      return showIsomnieGauge({
        medicalData: medicalData,
        time: temps[0],
        withColor: true,
        dataName: "À l'admission",
        showGaugeTile: true,
      })
    case DepressionItemKeys.insomnieEvolution:
      return showIsomnieLine({
        medicalData: medicalData,
        temps: [temps[0], temps[1]],
        dataName: 'Insomnie (ISI) : Évolution',
      })
    // hypersomnolence
    case DepressionItemKeys.hypersomnolenceBar:
      return showHypersomnolenceBar({
        medicalData: medicalData,
        time: temps[0],
      })
    case DepressionItemKeys.hypersomnolenceGauge:
      return showhypersomnolenceGauge({
        medicalData: medicalData,
        time: temps[0],
        withColor: true,
        dataName: "À l'admission",
        patientName: medicalData.name,
        showGaugeTitle: true,
      })
    case DepressionItemKeys.hypersomnolenceEvolution:
      return showHypersomnolenceLine({
        medicalData: medicalData,
        temps: [temps[0], temps[1]],
        dataName: 'Hypersomnolence (ISI): Évolution',
      })
    case DepressionItemKeys.impulsivityRadar:
      return showImpulsivityRadar({
        medicalData: medicalData,
        temps: temps,
        type: 'depression',
      })
    case DepressionItemKeys.consommationsSubstancesBar:
      return showConsommationsSubstancesBar({
        medicalData: medicalData,
        time: temps[0],
        showAlcool: true,
      })
    case DepressionItemKeys.consommationsSubstancesTable:
      return depressionConsommationSubstanceTable({
        medicalData: medicalData,
        time: temps[0],
      })
    case DepressionItemKeys.regulationEmotionBarBlance:
      return showRegulationEmotionBarBlance({
        medicalData: medicalData,
        temps: temps,
        graphType: 'depression',
      })
    case DepressionItemKeys.autoEfficacityBar:
      return showAutoEfficacitéBar({ medicalData: medicalData, time: temps[1] })
    case DepressionItemKeys.autoEfficacityGauge:
      return autoEfficacityGauge({
        medicalData: medicalData,
        time: temps[0],
        withColor: false,
        dataName: "À l'admission",
      })
    case DepressionItemKeys.dpAnxietyBar:
      return showAnxietyBar({
        medicalData: medicalData,
        time: temps[0],
        graphType: 'depression',
      })
    case DepressionItemKeys.dpAnxietyGauge:
      return showAnxietyGauge({
        medicalData: medicalData,
        time: temps[1],
        withColor: true,
        dataName: "En fin d'hospitalisation",
      })
    case DepressionItemKeys.dpAnxietyEvolution:
      return showAnxietyLine({
        medicalData: medicalData,
        temps: [temps[0], temps[1]],
        dataName: 'Anxiété (GAD7): Évolution',
      })
    case DepressionItemKeys.reseauSocialGauge:
      return showReseauSocialGauge({ medicalData: medicalData, temps: temps })
    case DepressionItemKeys.dpReseauSocialBar:
      return showDepressionReseauSocialBar({
        medicalData: medicalData,
        time: temps[0],
      })
    case DepressionItemKeys.externeAllianceTherapBar:
      return showExterneAllianceTherapBar({
        medicalData: medicalData,
        time: temps[1],
      })
    case DepressionItemKeys.indicesBipolarityGraphExpert:
      return showIndicesBipolarityGraph({
        title: 'Indices de bipolarité',
        medicalData: medicalData,
        time: temps[0],
      })
    case DepressionItemKeys.indicesBipolarityGraphPatient:
      return showIndicesBipolarityGraph({
        title: 'Indices de bipolarité',
        medicalData: medicalData,
        time: temps[1],
      })
    case DepressionItemKeys.infFamilieRadar:
      return showInfFamilieRadar({
        medicalData: medicalData,
        temps: [temps[0]],
        dataName: "Évènements stressants de l'enfance",
      })
    case DepressionItemKeys.dpForceFragilityRadar:
      return showDepressionForceFragilityRadar({
        medicalData: medicalData,
        temps: temps,
        doShowWarning: doShowWarning,
      })
    case DepressionItemKeys.dpSymptomesResiduelGraph:
      return showSymptomesResiduelGraph({
        medicalData: medicalData,
        time: temps[1],
        doShowWarning: doShowWarning,
      })
    case DepressionItemKeys.reactiviteEmoBar:
      return showReactivityEmotionelleBar({
        medicalData: medicalData,
        time: temps[0],
      })
    case DepressionItemKeys.reactiviteEmoEvolutionLine:
      return showReactiviteEmoEvolutionLine({
        medicalData: medicalData,
        temps: temps,
      })
    case DepressionItemKeys.reactiviteEmoRadar:
      return showReactiviteEmoRadar({
        medicalData: medicalData,
        temps: [temps[0], temps[1]],
      })
    case DepressionItemKeys.consommationsSubstancesGraph:
      return showConsommationsSubstancesGraph({
        medicalData: medicalData,
        time: temps[0],
      })
    case DepressionItemKeys.default:
      return null
    default:
      break
  }
}
