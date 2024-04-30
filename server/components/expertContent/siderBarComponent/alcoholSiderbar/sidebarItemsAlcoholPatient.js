import React from 'react'
import { AiOutlineSubnode } from 'react-icons/ai'
import { TbGauge } from 'react-icons/tb'
import { BsBarChartFill } from 'react-icons/bs'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { FaChartLine } from 'react-icons/fa'
import { RiNodeTree } from 'react-icons/ri'
import { FaBalanceScale } from 'react-icons/fa'
import { AlcoholItemKeys } from '../../../../models/dataset'
import Styles from '../siderbarcomponent.module.css'

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
 * Side bar items for alcool to display the graphs for patient
 */
export const AlcoholPatientSidebarItems = [
  getItem(
    <div className={Styles.sideBarMenuGroupTitleLabel}>
      Les échelles liées à la consommations
    </div>,
    'sub1',
    React.createElement(RiNodeTree),
    [
      getItem(
        `La sévérité du trouble d’usage de l’alcool`,
        'severityAlcohol',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            AlcoholItemKeys.troubelUsageAlcoGauge,
            React.createElement(TbGauge),
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
    <div className={Styles.sideBarMenuGroupTitleLabel}>Cercles vicieux</div>,
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
            AlcoholItemKeys.depressionGauge,
            React.createElement(TbGauge),
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
            AlcoholItemKeys.alcoAnxietyGauge,
            React.createElement(TbGauge),
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
            AlcoholItemKeys.alcoInsomnieGauge,
            React.createElement(TbGauge),
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
        'L’impulsivité',
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
    ],
    'group',
  ),
  getDividerItem('divider'),
  getItem(
    <div className={Styles.sideBarMenuGroupTitleLabel}>Soutiens</div>,
    'sub4',
    React.createElement(RiNodeTree),
    [
      getItem(
        'Par soi-même',
        'parSoiMeme',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            AlcoholItemKeys.autoEfficacityGauge,
            React.createElement(TbGauge),
          ),
          getItem(
            'Évolution',
            AlcoholItemKeys.autoEfficacityEvolutionLine,
            React.createElement(FaChartLine),
          ),
        ],
        'group',
      ),
      getItem(
        'Par l’entourage',
        'parEntourage',
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
        'À l’hôpital',
        'inHospital',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "En fin d'hospitalisation",
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
  getItem(
    <div className={Styles.sideBarMenuGroupTitleLabel}>La cognition</div>,
    'cognition',
    React.createElement(RiNodeTree),
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
  ),
  getDividerItem('divider'),
  getItem(
    <div className={Styles.sideBarMenuGroupTitleLabel}>
      Quelle qualité de vie
    </div>,
    'qualityVie',
    React.createElement(RiNodeTree),
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
    React.createElement(RiNodeTree),
    [
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
      getItem(
        'Les évolutions',
        'evolutions',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            'Avant et après le sevrage',
            AlcoholItemKeys.alcoResumeEvolutionsRadar,
            React.createElement(AiOutlineRadarChart),
          ),
        ],
        'group',
      ),
    ],
    'group',
  ),
]
