import React from 'react'
import { AiOutlineSubnode } from 'react-icons/ai'
import { BsBarChartFill } from 'react-icons/bs'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { RiNodeTree } from 'react-icons/ri'
import { FaChartLine, FaBalanceScale } from 'react-icons/fa'
import { BsTable } from 'react-icons/bs'
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

/** Define the side bar items: depression for experts */
export const DepressionSidebarItemsExpert = [
  getItem(
    <div className={Styles.sideBarMenuGroupTitleLabel}>
      {`Les caractéristiques de l'épisode-DepressionExpert`}
    </div>,
    'sub1',
    React.createElement(RiNodeTree),
    [
      getItem(
        "L'intensité de la dépression",
        'inteDepressionExpert',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.interDepressionBar,
            React.createElement(BsBarChartFill),
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
            DepressionItemKeys.reactiviteEmoBar,
            React.createElement(BsBarChartFill),
          ),
          getItem(
            'Évolution',
            DepressionItemKeys.reactiviteEmoEvolutionLine,
            React.createElement(FaChartLine),
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
            DepressionItemKeys.indicesBipolarityGraphExpert,
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
    React.createElement(RiNodeTree),
    [
      getItem(
        "L'anxiété",
        'anxiety',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "À l'admission",
            DepressionItemKeys.dpAnxietyBar,
            React.createElement(BsBarChartFill),
          ),
          getItem(
            'Évolution',
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
            DepressionItemKeys.insomnieBar,
            React.createElement(BsBarChartFill),
          ),
          getItem(
            'Évolution',
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
            DepressionItemKeys.hypersomnolenceBar,
            React.createElement(BsBarChartFill),
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
            DepressionItemKeys.consommationsSubstancesBar,
            React.createElement(BsBarChartFill),
          ),
          getItem(
            'Statistique',
            DepressionItemKeys.consommationsSubstancesTable,
            React.createElement(BsTable),
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
            'Évolution',
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
            DepressionItemKeys.autoEfficacityBar,
            React.createElement(BsBarChartFill),
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
            DepressionItemKeys.dpReseauSocialBar,
            React.createElement(BsBarChartFill),
          ),
        ],
        'group',
      ),
      getItem(
        'Externe: alliance thérapeutique',
        'allianceTherap',
        React.createElement(AiOutlineSubnode),
        [
          getItem(
            "Ressenti en fin d'hospitalisation",
            DepressionItemKeys.externeAllianceTherapBar,
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
    <div className={Styles.sideBarMenuGroupTitleLabel}>
      Histoire personnelle
    </div>,
    'sub5',
    React.createElement(RiNodeTree),
    [
      getItem(
        "Évènements stressants de l'enfance",
        DepressionItemKeys.infFamilieRadar,
        React.createElement(AiOutlineRadarChart),
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
            'Évolution',
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
