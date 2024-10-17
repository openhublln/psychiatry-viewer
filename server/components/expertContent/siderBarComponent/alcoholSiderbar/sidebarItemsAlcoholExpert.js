import React from 'react'
import { AiOutlineSubnode } from 'react-icons/ai'
import { TbGauge } from 'react-icons/tb'
import { BsBarChartFill } from 'react-icons/bs'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { RiNodeTree } from 'react-icons/ri'
import { FaChartLine, FaBalanceScale } from 'react-icons/fa'
import { AlcoholItemKeys } from '../../../../models/dataset'
import Styles from '../siderbarcomponent.module.css'
import { getDataByName } from '../../../../lib/datalib/parseData'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

function getDividerItem(type) {
  return {
    key: '',
    icon: null,
    children: null,
    label: '',
    type: 'divider',
  }
}

/**
 * Side bar items for alcool to display the expert graphs
 */
export function AlcoholExpertSidebarItems(medicalData, temps) {
  let ctqChoix = getDataByName(medicalData, 'ctq_choix', temps[1], medicalData.name)
  console.log("CTQ CHOIX:", ctqChoix)
  return [
    getItem(
      <div className={Styles.sideBarMenuGroupTitleLabel}>
        Les échelles liées aux consommations
      </div>,
      'sub1',
      React.createElement(RiNodeTree),
      [
        getItem(
          'La sévérité du trouble d’usage de l’alcool',
          'troubleAlcohol',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "À l'admission",
              AlcoholItemKeys.troubelUsageAlcoBar,
              React.createElement(BsBarChartFill),
            ),
          ],
          'group',
        ),
        getItem(
          'Le craving',
          'craving',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "À l'admission",
              AlcoholItemKeys.alcoCravingBar,
              React.createElement(BsBarChartFill),
            ),
            getItem(
              'Évolution',
              AlcoholItemKeys.alcoCravingEvolution,
              React.createElement(BsBarChartFill),
            ),
          ],
          'group',
        ),
        getItem(
          'Les autres consommations',
          'autreConsom',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "À l'admission",
              AlcoholItemKeys.alcoAutresConsommationBar,
              React.createElement(BsBarChartFill),
            ),
          ],
          'group',
        ),
      ],
      'group',
    ),
    getDividerItem('divider'),
    getItem(
      <div className={Styles.sideBarMenuGroupTitleLabel}>Les comorbidités</div>,
      'sub2',
      React.createElement(RiNodeTree),
      [
        getItem(
          'Les symptômes dépressifs',
          'symDepression',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "À l'admission",
              AlcoholItemKeys.alcoDepressionBar,
              React.createElement(BsBarChartFill),
            ),
            getItem(
              'Évolution',
              AlcoholItemKeys.alcoDepressionEvolution,
              React.createElement(FaChartLine),
            ),
          ],
          'group',
        ),
        getItem(
          'Les symptômes anxieux',
          'anxieux',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "À l'admission",
              AlcoholItemKeys.alcoAnxietyBar,
              React.createElement(BsBarChartFill),
            ),
            getItem(
              'Évolution',
              AlcoholItemKeys.alcoAnxietyEvolution,
              React.createElement(FaChartLine),
            ),
          ],
          'group',
        ),
        getItem(
          'Les troubles du sommeil',
          'insomnie',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "À l'admission",
              AlcoholItemKeys.alcoInsomnieBar,
              React.createElement(BsBarChartFill),
            ),
            getItem(
              'Évolution',
              AlcoholItemKeys.alcoInsomnieEvolution,
              React.createElement(FaChartLine),
            ),
          ],
          'group',
        ),
      ],
      'group',
    ),
    getDividerItem('divider'),
    getItem(
      <div className={Styles.sideBarMenuGroupTitleLabel}>
        Les modes de réaction face à un évènement
      </div>,
      'sub3',
      React.createElement(RiNodeTree),
      [
        getItem(
          'La gestion des émotions',
          'regEmotion',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              'Balance',
              AlcoholItemKeys.regulationEmotionBarBlance,
              React.createElement(FaBalanceScale),
            ),
          ],
          'group',
        ),
        getItem(
          "L'impulsivité",
          'impulsivity',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              'Différentes facettes',
              AlcoholItemKeys.impulsivityRadar,
              React.createElement(AiOutlineRadarChart),
            ),
          ],
          'group',
        ),
      ],
      'group',
    ),
    getDividerItem('divider'),
    getItem(
      <div className={Styles.sideBarMenuGroupTitleLabel}>La cognition</div>,
      'cognition',
      React.createElement(AiOutlineSubnode),
      [
        getItem(
          "En fin d'hospitalisation",
          AlcoholItemKeys.alcoCongnitionBar,
          React.createElement(BsBarChartFill),
        ),
      ],
      'group',
    ),
    getDividerItem('divider'),
    getItem(
      <div className={Styles.sideBarMenuGroupTitleLabel}>
        Les soutiens possibles
      </div>,
      'sub4',
      React.createElement(RiNodeTree),
      [
        getItem(
          `Interne : L'auto-efficacité`,
          'autoEfficacité',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "À l'admission",
              AlcoholItemKeys.autoEfficacitybar,
              React.createElement(TbGauge),
            ),
            getItem(
              'Évolution',
              AlcoholItemKeys.autoEfficacityEvolutionLine,
              React.createElement(TbGauge),
            ),
          ],
          'group',
        ),
        getItem(
          'Interne: La motivation et préparation au changement',
          'prepareChange',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "À l'admission",
              AlcoholItemKeys.alcoMotivationChangementBar,
              React.createElement(BsBarChartFill),
            ),
          ],
          'group',
        ),
        getItem(
          'Externe: Réseau social',
          'exReseauSocial',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              'Quantitatif et qualitatif',
              AlcoholItemKeys.reseauSocialGauge,
              React.createElement(TbGauge),
            ),
          ],
          'group',
        ),
        getItem(
          'Externe: Alliance thérapeutique',
          'AllianceThéra',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              "Ressentie en fin d'hospitalisation",
              AlcoholItemKeys.externeAllianceTherapBar,
              React.createElement(BsBarChartFill),
            ),
          ],
          'group',
        ),
      ],
      'group',
    ),
    getDividerItem('divider'),
    (ctqChoix == 1) ?
    getItem(
      <div className={Styles.sideBarMenuGroupTitleLabel}>
        Histoire infantile et familiale
      </div>,
      'historyInfFam',
      React.createElement(RiNodeTree),
      [
        getItem(
          'La charge du passé',
          AlcoholItemKeys.infFamilieRadar,
          React.createElement(AiOutlineRadarChart),
      ),
      ],
      'group',
    ) : null,
    (ctqChoix == 1) ?
    getDividerItem('divider') : null,
    getItem(
      <div className={Styles.sideBarMenuGroupTitleLabel}>La qualité de vie</div>,
      AlcoholItemKeys.alcoQualityVieBar,
      React.createElement(BsBarChartFill),
      [
        getItem(
          "À l'admission",
          AlcoholItemKeys.alcoQualityVieBar,
          React.createElement(BsBarChartFill),
        ),
      ],
      'group',
    ),
    getDividerItem('divider'),
    getItem(
      <div className={Styles.sideBarMenuGroupTitleLabel}>En résumé</div>,
      'sub8',
      React.createElement(BsBarChartFill),
      [
        getItem(
          'Les évolutions',
          'evolutions',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              `Avant et après le sevrage`,
              AlcoholItemKeys.alcoResumeEvolutionsRadar,
              React.createElement(AiOutlineRadarChart),
            ),
          ],
          'group',
        ),
        getItem(
          'Les forces et fragilités',
          'forcesFrag',
          React.createElement(AiOutlineSubnode),
          [
            getItem(
              'Où agir',
              AlcoholItemKeys.alcoForceFragilityRadar,
              React.createElement(AiOutlineRadarChart),
            ),
          ],
          'group',
        ),
      ],
      'group',
    ),
  ]
}
