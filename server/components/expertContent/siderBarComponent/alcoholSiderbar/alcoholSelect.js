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
        time: temps[0],
        withColor: true,
        dataName: "À l'admission",
        patientName: medicalData.name,
      })
    case AlcoholItemKeys.alcoDepressionEvolution:
      return showDisplayEvolutionLine({
        medicalData: medicalData,
        temps: temps,
        dataName: 'Dépression (PHQ9)',
        dataColumns: DataColumns.phq9.columns,
        missingDataColumns: DataColumns.phq9.generalColumns,
        maxValue: 27,
        doShowWarning: doShowWarning,
        ticksCallback: function (value) {
          switch (value) {
            case 0:
              return ScoreSegmentLabels.absente
            case 4.9:
              return ScoreSegmentLabels.léger
            case 9.5:
              return ScoreSegmentLabels.modéré
            case 14.5:
              return ScoreSegmentLabels.modsévère
            case 19.5:
              return ScoreSegmentLabels.sévère
            case 27 :
              return ''
            default:
              break
          }
        },
        y1StepSize: 0.05,
        colorScale : [
          {
            threshold: 4.9,
            color: ScoreSegmentColors.absenteRGBString,
          },
          {
            threshold: 9.5,
            color: ScoreSegmentColors.légerRGBString,
          },
          {
            threshold: 14.5,
            color: ScoreSegmentColors.modéréRGBString,
          },
          {
            threshold: 19.5,
            color: ScoreSegmentColors.modsévèreRGBString,
          },
          {
            threshold: 27,
            color: ScoreSegmentColors.sévèreRGBString,
          },
      ],
      })
    case AlcoholItemKeys.alcoCravingBar:
      return showAlcoCravingBar({
        medicalData: medicalData,
        time: temps[0],
        dataName: ['Le craving (OCDS)'],
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
        dataName: 'Anxiété (GAD7)',
        dataColumns: DataColumns.gad7.columns,
        missingDataColumns: DataColumns.gad7.generalColumns,
        maxValue: 21,
        // doShowWarning: doShowWarning,
        ticksCallback: function (value) {
          switch (value) {
            case 0:
              return ScoreSegmentLabels.absente
            case 4.5:
              return ScoreSegmentLabels.léger
            case 9.5:
              return ScoreSegmentLabels.modéré
            case 14.5:
              return ScoreSegmentLabels.sévère
            case 21 :
              return ''
            default:
              break
          }
        },
        y1StepSize: 0.05,
        colorScale : [
          {
            threshold: 4.5,
            color: ScoreSegmentColors.absenteRGBString,
          },
          {
            threshold: 9.5,
            color: ScoreSegmentColors.légerRGBString,
          },
          {
            threshold: 14.5,
            color: ScoreSegmentColors.modéréRGBString,
          },
          {
            threshold: 21,
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
        time: temps[0],
        withColor: true,
        dataName: "À l'admission",
        patientName: medicalData.name,
        showGaugeTitle: true,
      })
    case AlcoholItemKeys.alcoInsomnieEvolution:
      return showDisplayEvolutionLine({
        medicalData: medicalData,
        temps: temps,
        dataName: 'Insomnie (ISI)',
        dataColumns: DataColumns.isi.columns,
        missingDataColumns: DataColumns.isi.generalColumns,
        maxValue: 28,
        doShowWarning: doShowWarning,
        ticksCallback: function(value) {
          switch (value) {
            case 0:
              return ScoreSegmentLabels.absente
            case 7.5:
              return ScoreSegmentLabels.léger
            case 14.5:
              return ScoreSegmentLabels.modéré
            case 21.5:
              return ScoreSegmentLabels.sévère
            case 28:
                return ''
            default:
              break
          }
        },
        y1StepSize: 0.05,
        colorScale : [
            {
              threshold: 7.5,
              color: ScoreSegmentColors.absenteRGBString,
            },
            {
              threshold: 14.5,
              color: ScoreSegmentColors.légerRGBString,
            },
            {
              threshold: 21.5,
              color: ScoreSegmentColors.modéréRGBString,
            },
            {
              threshold: 28,
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
        dataName: "L'Auto efficacité (GSES)",
        dataColumns: DataColumns.gse.columns,
        maxValue: 100,
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
        normalized : true,
        minNormalized: 10,
        maxNormalized: 40,
      })
    case AlcoholItemKeys.autoEfficacitybar:
      return showAutoEfficacitéBar({ medicalData: medicalData, time: temps[0], graphType:GraphType.alcohol })
    case AlcoholItemKeys.alcoQualityVieBar:
      return showQulityVieBar({ medicalData: medicalData, time: temps[0] })
    case AlcoholItemKeys.externeAllianceTherapBar:
      return showExterneAllianceTherapBar({
        medicalData: medicalData,
        time: temps[1],
        graphType: GraphType.alcohol
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
        temps: [temps[1]],
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
