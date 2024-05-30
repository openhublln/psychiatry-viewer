import React from 'react'
import { AiOutlineSubnode } from 'react-icons/ai'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { RiNodeTree } from 'react-icons/ri'
import { FaChartLine, FaBalanceScale } from 'react-icons/fa'
import { TbGauge } from 'react-icons/tb'
import { AiFillPicture } from 'react-icons/ai'
import { DepressionItemKeys } from '../../../../models/dataset'
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
 * Side bar items for depression to display the expert graphs
 */
export const DepressionSidebarItemsPatient = [
  getItem(
    <div className={Styles.sideBarMenuGroupTitleLabel}>
      Les caractéristiques de l'épisode
    </div>,
    'sub1',
    React.createElement(RiNodeTree),
    [
      getItem(
        "L'intensité de la dépression",
        'inteDepressionPatient',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.depressionGauge,
            React.createElement(TbGauge),
          ),
          getItem(
            'Évolution',
            DepressionItemKeys.interDepressionEvolution,
            React.createElement(FaChartLine),
          ),
        ],
        'group',
      ),
      getItem(
        'La réactivité émotionnelle',
        'reactiviteEmo',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.reactiviteEmoRadar,
            React.createElement(AiOutlineRadarChart),
          ),
          getItem(
            'Évolution',
            DepressionItemKeys.reactiviteEmoEvolutionLine,
            React.createElement(AiOutlineRadarChart),
          ),
        ],
        'group',
      ),
      getItem(
        'Les indices de bipolarité',
        'IndBipolar',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            'Évolution',
            DepressionItemKeys.indicesBipolarityGraphPatient,
            React.createElement(AiFillPicture),
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
    React.createElement(AiOutlineSubnode),
    [
      getItem(
        "L'anxiété",
        'anxiety',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.dpAnxietyGauge,
            React.createElement(TbGauge),
          ),
          getItem(
            'Evolution',
            DepressionItemKeys.dpAnxietyEvolution,
            React.createElement(FaChartLine),
          ),
        ],
        'group',
      ),
      getItem(
        "L'insomnie",
        'insomnie',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.insomnieGauge,
            React.createElement(TbGauge),
          ),
          getItem(
            'Evolution',
            DepressionItemKeys.insomnieEvolution,
            React.createElement(FaChartLine),
          ),
        ],
        'group',
      ),
      getItem(
        "L'hypersomnolence",
        'hypersom',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.hypersomnolenceGauge,
            React.createElement(TbGauge),
          ),
          getItem(
            'Évolution',
            DepressionItemKeys.hypersomnolenceEvolution,
            React.createElement(FaChartLine),
          ),
        ],
        'group',
      ),
      getItem(
        'Les consommations',
        'consommations',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.consommationsSubstancesGraph,
            React.createElement(AiFillPicture),
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
      Les modes de fonctionnement
    </div>,
    'sub3',
    React.createElement(RiNodeTree),
    [
      getItem(
        "L'impulsivité",
        'impulsivity',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.impulsivityRadar,
            React.createElement(AiOutlineRadarChart),
          ),
        ],
        'group',
      ),
      getItem(
        'La gestion des émotions',
        'gestionEmotion',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.regulationEmotionBarBlance,
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
    <div className={Styles.sideBarMenuGroupTitleLabel}>Les soutiens</div>,
    'sub4',
    React.createElement(RiNodeTree),
    [
      getItem(
        `Interne: L'auto-efficacité`,
        'autoEfficacity',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.autoEfficacityGauge,
            React.createElement(TbGauge),
          ),
        ],
        'group',
      ),
      getItem(
        'Externe: réseau social',
        'reseauSocial',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            'Quantitatif et qualitatif',
            DepressionItemKeys.reseauSocialGauge,
            React.createElement(TbGauge),
          ),
        ],
        'group',
      ),
    ],
    'group',
  ),
  getDividerItem('divider'),
  getItem(
    <div className={Styles.sideBarMenuGroupTitleLabel}>En résumé</div>,
    'sub6',
    React.createElement(RiNodeTree),
    [
      getItem(
        'Prévention de la rechute',
        'forceFragility',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            'Évolution',
            DepressionItemKeys.dpForceFragilityRadar,
            React.createElement(AiOutlineRadarChart),
          ),
        ],
        'group',
      ),
      getItem(
        'Les symptômes résiduels',
        'symptomesResiduels',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            'Après le sevrage',
            DepressionItemKeys.dpSymptomesResiduelGraph,
            React.createElement(AiFillPicture),
          ),
        ],
        'group',
      ),
    ],
    'group',
  ),
]
