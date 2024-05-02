import {
  DataColumns,
  AlcoholItemKeys,
  ScoreSegmentLabels,
  ScoreSegmentColors,
  GraphType,
} from '../../../../models/dataset'
import { showAlcoCravingEvolution } from '../../../chartComponents/alcoholCharts/alcoEvolution'
import {
  showAlcoDepressionBar,
  showTroubleUsageAlcoBar,
  showAlcoInsomnieBar,
  showQulityVieBar,
  showAlcoCongnitionBar,
  showAlcoCravingBar,
  showMotivationChangeBar,
} from '../../../chartComponents/alcoholCharts/alcoBarCharts'
import {
  showTroubleUsageAlcoGauge,
  alcoInsomnieGauge,
} from '../../../chartComponents/alcoholCharts/alcoGaugeCharts'
import {
  showAlcoForceFragilityRadar,
  showAlcoResumeEvolutionsRadar,
} from '../../../chartComponents/alcoholCharts/alcoRadarCharts'

import {
  showImpulsivityRadar,
  showInfFamilieRadar,
} from '../../../chartComponents/generalCharts/generalRadarCharts'
import {
  showAnxietyBar,
  showAutoEfficacitéBar,
  showExterneAllianceTherapBar,
  showConsommationsSubstancesBar,
  showRegulationEmotionBarBlance,
} from '../../../chartComponents/generalCharts/generalBarCharts'
import {
  showDepressionGauge,
  showAnxietyGauge,
  autoEfficacityGauge,
  showReseauSocialGauge,
} from '../../../chartComponents/generalCharts/generalGaugeCharts'
import {
  showIsomnieLine,
  showDisplayEvolutionLine,
  showInterDepressionEvolutionLine,
} from '../../../chartComponents/generalCharts/generalLineCharts'

// **** Alcohol **********
export const AlcoholSelect = (key, medicalData, temps, doShowWarning) => {
  switch (key) {
    case AlcoholItemKeys.troubelUsageAlcoBar:
      return showTroubleUsageAlcoBar({
        medicalData: medicalData,
        time: temps[0],
        patientName: medicalData.name,
      })
    case AlcoholItemKeys.troubelUsageAlcoGauge:
      return showTroubleUsageAlcoGauge({
        medicalData: medicalData,
        time: temps[0],
        withColor: true,
        dataName: "À l'admission",
        patientName: medicalData.name,
        showGaugeTitle: true,
      })
    case AlcoholItemKeys.alcoDepressionBar:
      return showAlcoDepressionBar({
        medicalData: medicalData,
        time: temps[0],
      })
    case AlcoholItemKeys.depressionGauge:
      return showDepressionGauge({
        medicalData: medicalData,
        time: temps[1],
        withColor: true,
        dataName: "À l'admission",
        patientName: medicalData.name,
      })
    case AlcoholItemKeys.alcoDepressionEvolution:
      return showDisplayEvolutionLine({
        medicalData: medicalData,
        temps: temps,
        dataName: 'Dépression (PHQ9) : Évolution',
        dataColumns: DataColumns.phq9.columns,
        maxValue: 30,
        ticksCallback: function (value) {
          switch (value) {
            case 2:
              return ScoreSegmentLabels.absente
            case 8:
              return ScoreSegmentLabels.léger
            case 12:
              return ScoreSegmentLabels.modéré
            case 18:
              return ScoreSegmentLabels.modsévère
            case 24:
              return ScoreSegmentLabels.sévère
            default:
              break
          }
        },
        y1StepSize: 2,
        colorScale : [
          {
            threshold: 2,
            color: ScoreSegmentColors.absenteRGBString,
          },
          {
            threshold: 8,
            color: ScoreSegmentColors.légerRGBString,
          },
          {
            threshold: 12,
            color: ScoreSegmentColors.modéréRGBString,
          },
          {
            threshold: 18,
            color: ScoreSegmentColors.modsévèreRGBString,
          },
          {
            threshold: 24,
            color: ScoreSegmentColors.sévèreRGBString,
          },
      ]
      })
    case AlcoholItemKeys.alcoCravingBar:
      return showAlcoCravingBar({
        medicalData: medicalData,
        time: temps[0],
        dataName: ['Le craving (OCDS)', "À l'admission"],
        backgroundColor: '',
      })
    case AlcoholItemKeys.alcoCravingEvolution:
      return showAlcoCravingEvolution({
        medicalData: medicalData,
        temps: temps,
      })
    case AlcoholItemKeys.alcoAnxietyBar:
      return showAnxietyBar({
        medicalData: medicalData,
        time: temps[0],
        graphType: GraphType.alcohol,
      })
    case AlcoholItemKeys.alcoAutresConsommationBar:
      return showConsommationsSubstancesBar({
        medicalData: medicalData,
        time: temps[0],
        showAlcool: false,
      })
    case AlcoholItemKeys.alcoAnxietyGauge:
      return showAnxietyGauge({
        medicalData: medicalData,
        time: temps[0],
        withColor: true,
        dataName: "À l'admission",
      })
    case AlcoholItemKeys.alcoAnxietyEvolution:
      return showDisplayEvolutionLine({
        medicalData: medicalData,
        temps: temps,
        dataName: 'Anxiété (GAD7): Évolution',
        dataColumns: DataColumns.gad7.columns,
        maxValue: 21,
        ticksCallback: function (value) {
          switch (value) {
            case 4:
              return ScoreSegmentLabels.absente
            case 8:
              return ScoreSegmentLabels.léger
            case 12:
              return ScoreSegmentLabels.modéré
            case 16:
              return ScoreSegmentLabels.sévère
            default:
              break
          }
        },
        y1StepSize: 4,
        colorScale : [
          {
            threshold: 4,
            color: ScoreSegmentColors.absenteRGBString,
          },
          {
            threshold: 8,
            color: ScoreSegmentColors.légerRGBString,
          },
          {
            threshold: 12,
            color: ScoreSegmentColors.modéréRGBString,
          },
          {
            threshold: 16,
            color: ScoreSegmentColors.sévèreRGBString,
          },
      ]
      })
    case AlcoholItemKeys.alcoInsomnieBar:
      return showAlcoInsomnieBar({
        medicalData: medicalData,
        time: temps[0],
        patientName: medicalData.name,
      })
    case AlcoholItemKeys.alcoInsomnieGauge:
      return alcoInsomnieGauge({
        medicalData: medicalData,
        time: temps[1],
        withColor: true,
        dataName: "En fin d'hospitalisation",
        patientName: medicalData.name,
        showGaugeTitle: true,
      })
    case AlcoholItemKeys.alcoInsomnieEvolution:
      return showDisplayEvolutionLine({
        medicalData: medicalData,
        temps: temps,
        dataName: 'Insomnie (ISI): Évolution',
        dataColumns: DataColumns.isi.columns,
        maxValue: 30,
        ticksCallback: function (value) {
          switch (value) {
            case 6:
              return ScoreSegmentLabels.absente
            case 12:
              return ScoreSegmentLabels.léger
            case 18:
              return ScoreSegmentLabels.modéré
            case 24:
              return ScoreSegmentLabels.sévère
            default:
              break
          }
        },
        y1StepSize: 6,
        colorScale : [
            {
              threshold: 6,
              color: ScoreSegmentColors.absenteRGBString,
            },
            {
              threshold: 12,
              color: ScoreSegmentColors.légerRGBString,
            },
            {
              threshold: 18,
              color: ScoreSegmentColors.modéréRGBString,
            },
            {
              threshold: 24,
              color: ScoreSegmentColors.sévèreRGBString,
            },
        ]
      })
    case AlcoholItemKeys.impulsivityRadar:
      return showImpulsivityRadar({
        medicalData: medicalData,
        temps: temps,
        graphType: GraphType.alcohol,
      })
    case AlcoholItemKeys.autoEfficacityGauge:
      return autoEfficacityGauge({
        medicalData: medicalData,
        time: temps[0],
        withColor: false,
        dataName: "À l'admission",
      })
    case AlcoholItemKeys.autoEfficacityEvolutionLine:
      return showDisplayEvolutionLine({
        medicalData: medicalData,
        temps: temps,
        dataName: "L'Auto efficatité (GSES)",
        dataColumns: DataColumns.gse.columns,
        maxValue: 40,
        ticksCallback: null,
        // ticksCallback: function (value) {
        //   switch (value) {
        //     case 5:
        //       return ScoreSegmentLabels.nothing
        //     default:
        //       break
        //   }
        // },
        y1StepSize: 2,
      })
    case AlcoholItemKeys.autoEfficacitybar:
      return showAutoEfficacitéBar({ medicalData: medicalData, time: temps[0] })
    case AlcoholItemKeys.alcoQualityVieBar:
      return showQulityVieBar({ medicalData: medicalData, time: temps[0] })
    case AlcoholItemKeys.externeAllianceTherapBar:
      return showExterneAllianceTherapBar({
        medicalData: medicalData,
        time: temps[1],
      })
    case AlcoholItemKeys.reseauSocialGauge:
      return showReseauSocialGauge({ medicalData: medicalData, temps: temps })
    case AlcoholItemKeys.alcoCongnitionBar:
      return showAlcoCongnitionBar({ medicalData: medicalData, temps: temps })
    case AlcoholItemKeys.alcoMotivationChangementBar:
      return showMotivationChangeBar({
        medicalData: medicalData,
        time: temps[0],
        patientName: medicalData.name,
      })
    case AlcoholItemKeys.infFamilieRadar:
      return showInfFamilieRadar({
        medicalData: medicalData,
        temps: [temps[0]],
        dataName: 'La charge du passé',
      })
    case AlcoholItemKeys.alcoForceFragilityRadar:
      return showAlcoForceFragilityRadar({
        medicalData: medicalData,
        time: temps,
        doShowWarning: doShowWarning,
      })
    case AlcoholItemKeys.alcoResumeEvolutionsRadar:
      return showAlcoResumeEvolutionsRadar({
        medicalData: medicalData,
        temps: temps,
        doShowWarning: doShowWarning,
      })
    case AlcoholItemKeys.regulationEmotionBarBlance:
      return showRegulationEmotionBarBlance({
        medicalData: medicalData,
        temps: temps,
        graphType: GraphType.alcohol,
      })
    default:
      return null
  }
}
