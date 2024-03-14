export const ScoreSegmentColors = {
  absenteRGBString: 'rgb(34,139,34)', // green
  absenteHex: '#228B22',
  absenteRGBArray: [34, 139, 34],
  légerRGBString: 'rgb(255, 255, 0)', // yellow
  légerRGBArray: [255, 255, 0],
  légerHex: '#FFFF00',
  modéréRGBString: 'rgb(255, 165, 0)', // orange
  modéréRGBArray: [255, 165, 0],
  modéréHex: '#ffa500',
  modsévèreRGBString: 'rgb(255, 114, 118)', // light red
  modsévèreRGBArray: [255, 114, 118],
  modsévèreHex: '#FF7276',
  sévèreRGBString: 'rgb(255,0,0)', //red
  sévèreRGBArray: [255, 0, 0],
  sévèreHex: '#FF0000',
  presenteRGBString: 'rgb(255,0,0)', //red
  presenteRGBArray: [255, 0, 0],
  presenteHex: '#FF0000',
  nothingRGBString: 'rgb(0,128,0)',
  nothingRGBArray: [0, 128, 0],
  nothingHex: '#008000',
}

export const NoScoreSegmentColors = {
  blueRGBString: 'rgb(0, 0, 255)',
  greenRGBString: 'rgb(34,139,34)',
  crystalRGBString: 'rgb(172, 221, 222)',
  yellowRGBString: 'rgb(255, 255, 0)',
  orangeRGBString: 'rgb(255, 165, 0)',
  lighterPurpleRGBString: 'RGB(202, 141, 253)',
  greenYellowRGBString: 'rgb(197, 255, 45)',
  brightGrayRGBString: 'rgb(231, 241, 245)',
  royalPurpleRGBString: 'rgb(104, 82, 172)',
  congoPinkRGBString: 'rgb(255, 125, 123)',
}

export const SingleBarColors = {
  brightBlueRGBString: 'rgb(0, 150, 255)',
  pastelOrangeRGBString: 'rgb(254, 181, 68)',
  persianIndigoRGBString: 'rgb(41, 27, 128)',
  axolotRGBString: 'rgb(92, 113, 94)',
  tickleMePinkRGBString: 'rgb(255, 133, 178)',
  pinkRGBString: 'rgb(142, 68, 173)',
  darkYellowGreenRGBString: 'rgb(183, 149, 11)',
  congoPinkRGBString: 'rgb(255, 125, 123)',
  darkRedRGBString: 'rgb(169, 50, 38)',
  purple: 'rgb(186,85,211)',
}

export const RadarDataColors = {
  greenRGBString: 'rgb(34,139,34)',
  orangeRGBString: 'rgb(255, 165, 0)',
  blueRGBString: 'rgb(0, 0, 255)',
  yellowRGBString: 'rgb(255, 255, 0)',
  royalPurpleRGBString: 'rgb(104, 82, 172)',
}

export const LineDataColors = [
  'rgb(34,139,34)',
  'rgb(255, 165, 0)',
  'rgb(0, 0, 255)',
  'rgb(255, 255, 0)',
  'rgb(104, 82, 172)',
  'rgb(197, 255, 45)',
  'rgb(92, 113, 94)',
  'rgb(225, 121, 104)',
  'RGB(202, 141, 253)',
]

export const GaugeSpecialColors = {
  lightGreenRGBString: 'rgb(144, 238, 144)',
  softCyanRGBString: 'rgb(173, 216, 230)',
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const GraphType = {
  alcohol: 'alcohol',
  depression: 'depression',
  other: 'autre',
}

export const ViewType = {
  medicin: 'Médicin',
  autre: 'Autre personnel soignant',
}

export const ScoreSegmentLabels = {
  absente: 'Absence',
  léger: 'Légère',
  modéré: 'Modérée',
  modsévère: 'Modérément sévère',
  modsévèreSeperated: ['Modé.', 'sévère'],
  sévère: 'Sévère',
  total: 'Total',
  unknow: 'Unknown',
  adaptatifTotal: ['adaptatif', 'Total'],
  nonAdaptatifTotal: ['non-adaptatif', 'Total'],
  quantity: 'quantité',
  quality: 'qualité',
  populationgeneral: 'Pop.générale',
  nothing: '',
  noProblem: ['Pas de', 'trouble'],
  absenceDeTual: ['Absence', 'de TUAL'],
  presente: 'Présence',
  PasIntervention: "Pas d'intervention",
  interventionBreve: ['Intervention', 'brève'],
  traitementPlusIntensif: ['Traitement', 'Plus intensif'],
  activation: 'activation',
  etatHabituel: ['état habituel', '(normothymique)'],
  inhition: 'inhibition',
}

export const DataColumns = {
  dsm: { name: [''], columns: ['dsm_tot'] },
  ocds: {
    name: [
      ['Pensées', 'Obsédantes'],
      ['Comportements', 'Compulsifs'],
      ['Craving ', 'Total'],
    ],
    columns: ['ocdsm_obs', 'ocdsm_comp', 'ocdsm_tot'],
  },
  phq9: { name: ['Dépression'], columns: ['phq9_tot'], maxTotal: 27 },
  gad7: { name: ['Anxiété'], columns: ['gad7_tot'], maxTotal: 21 },
  hsi: { name: ['hypersomnolence'], columns: ['hsi_tot'], maxTotal: 36 },
  isi: { name: ['Insomnie'], columns: ['isi_tot'], maxTotal: 28 },
  uppsp20: {
    name: [
      ['Urgence', 'négative'],
      ['Urgence', 'positive'],
      ['Manque de', 'préméditation'],
      ['Manque de', 'persévérance'],
      ['Recherche de', 'sensations'],
    ],
    columns: [
      'upps_urg',
      'upps_pos',
      'upps_premed',
      'upps_perse',
      'upps_sensa',
    ],
  },
  cerq: {
    name: ['regadapt', 'regnonadapt'],
    columns: ['cerq_regadapt', 'cerq_regnonadapt'],
    regadaptMaxTotal: 100,
    regnonadaptMaxTotal: 80,
    adaptativesColumns: [
      'cerq_acceptation',
      'cerq_centrationpositive',
      'cerq_centrationsurlaction',
      'cerq_reevaluationpositive',
      'cerq_miseenperspective',
    ],
    nonAdaptativesColumns: [
      'cerq_blamedautrui',
      'cerq_rumination',
      'cerq_blamedesoi',
      'cerq_dramatisation',
    ],
  },
  gse: { name: ['Total'], columns: ['gse_tot'], maxTotal: 40 },
  ssq6: {
    name: ['Disponibilité', 'Satisfaction'],
    columns: ['ssq6_quant', 'ssq6_qual'],
    quantityMaxTotal: 54,
    qualityMaxTotal: 36,
  },
  wai: { name: ['Total'], columns: ['wai_tot'], maxTotal: 100 },
  socrates: {
    name: ['Reconnaissance', 'Ambivalence', ['Prise de', 'mesures']],
    columns: [
      'SOCRATES_recognition',
      'SOCRATES_ambivalence',
      'SOCRATES_takingsteps',
    ],
  },
  bearni: {
    name: [
      ['Ordination', 'alphabétique'],
      ['Fluence', 'alternée'],
      ['Capacités', 'visuo-spatiales'],
      ['Mémoire', 'verbale', 'différée'],
      ['Ataxie en', 'équilibre'],
    ],
    columns: [
      'bearni_ordialpha',
      'bearni_fluencealt',
      'bearni_capavisuospa',
      'bearni_memverbdif',
      'bearni_ataxie',
    ],
    total: 'bearni_tot',
  },
  ctq: {
    name: [
      ['Abus', 'Physique'],
      ['Abus', 'Sexuel'],
      ['Négligence', 'Physique'],
      ['Abus', 'Émotionnel'],
      ['Négligence', 'Émotionnelle'],
    ],
    columns: {
      ctq_q1: 'ctq_q1',
      ctq_q2: 'ctq_q2',
      ctq_q3: 'ctq_q3',
      ctq_q4: 'ctq_q4',
      ctqR_q5: 'ctqR_q5',
      ctq_q6: 'ctq_q6',
      ctqR_q7: 'ctqR_q7',
      ctq_q8: 'ctq_q8',
      ctq_q9: 'ctq_q9',
      ctq_q11: 'ctq_q11',
      ctq_q12: 'ctq_q12',
      ctqR_q13: 'ctqR_q13',
      ctq_q14: 'ctq_q14',
      ctq_q15: 'ctq_q15',
      ctq_q17: 'ctq_q17',
      ctq_q18: 'ctq_q18',
      ctqR_q19: 'ctqR_q19',
      ctq_q20: 'ctq_q20',
      ctq_q21: 'ctq_q21',
      ctq_q23: 'ctq_q23',
      ctq_q24: 'ctq_q24',
      ctq_q25: 'ctq_q25',
      ctqR_q26: 'ctqR_q26',
      ctq_q27: 'ctq_q27',
      ctqR_q28: 'ctqR_q28',
    },
    resultExposition: 'ctq_exposition',
    resultColumns: [
      'ctq_abusphysique',
      'ctq_abussexuel',
      'ctq_negligencephysique',
      'ctq_abusemotionnel',
      'ctq_negligenceemotionnelle',
    ],
  },
  whoQolBref: {
    name: [
      ['Santé', 'physique'],
      ['Bien-être', 'psychique '],
      ['Relations', 'sociales'],
      ['Environnement'],
    ],
    columns: {
      whoqolR_q3: 'whoqolR_q3',
      whoqolR_q4: 'whoqolR_q4',
      whoqolR_q26: 'whoqolR_q26',
      whoqol_q5: 'whoqol_q5',
      whoqol_q6: 'whoqol_q6',
      whoqol_q7: 'whoqol_q7',
      whoqol_q8: 'whoqol_q8',
      whoqol_q9: 'whoqol_q9',
      whoqol_q10: 'whoqol_q10',
      whoqol_q11: 'whoqol_q11',
      whoqol_q12: 'whoqol_q12',
      whoqol_q13: 'whoqol_q13',
      whoqol_q14: 'whoqol_q14',
      whoqol_q15: 'whoqol_q15',
      whoqol_q16: 'whoqol_q16',
      whoqol_q17: 'whoqol_q17',
      whoqol_q18: 'whoqol_q18',
      whoqol_q19: 'whoqol_q19',
      whoqol_q20: 'whoqol_q20',
      whoqol_q21: 'whoqol_q21',
      whoqol_q22: 'whoqol_q22',
      whoqol_q23: 'whoqol_q23',
      whoqol_q24: 'whoqol_q24',
      whoqol_q25: 'whoqol_q25',
    },
    resultColumns: [
      'whoqol_physicalh100',
      'whoqol_psychologicalh100',
      'whoqol_social100',
      'whoqol_environment100',
    ],
  },
  assistv3: {
    name: [
      ['Cannabis'],
      ['Cocaine'],
      ['Amphetamine'],
      ['Solvant'],
      ['Calmant'],
      ['Hallucinogene'],
      ['Opiace'],
      ['Autre'],
    ],
    columns_assist_alcool_tot: [
      'assist_q2b',
      'assist_q3b',
      'assist_q4b',
      'assist_q5b',
      'assist_q6b',
      'assist_q7b',
    ],
    consommation_alcool: 'assist_alcool_tot',
    consommation_presence: 'consommation_presence',
    consommation_columns: [
      'assist_cannabis_tot',
      'assist_cocaine_tot',
      'assist_amphetamine_tot',
      'assist_solvant_tot',
      'assist_calmant_tot',
      'assist_hallucinogene_tot',
      'assist_opiace_tot',
      'assist_autre_tot',
    ],
    consomSubTableColumns: [
      'assist_q2a',
      'assist_q2b',
      'assist_q2c',
      'assist_q2d',
      'assist_q2e',
      'assist_q2f',
      'assist_q2g',
      'assist_q2h',
      'assist_q2i',
      'assist_q2j',
    ],
    columns: [
      'assist_tabac_tot',
      'assist_alcool_tot',
      'assist_cannabis_tot',
      'assist_cocaine_tot',
      'assist_amphetamine_tot',
      'assist_solvant_tot',
      'assist_calmant_tot',
      'assist_hallucinogene_tot',
      'assist_opiace_tot',
      'assist_autre_tot',
    ],
    graphColumnsMiddle: ['consommation_alcool', 'consommation_autre'],
    graphDataNamesMiddle: ['Alcool', 'Autre'],
    graphColumnsRight: [
      'consommation_cocaine',
      'consommation_amphetamine',
      'consommation_solvant',
      'consommation_hallucinogene',
    ],
    graphDataNamesRight: ['Cocaine', 'Amphetamine', 'Solvant', 'Hallucinogene'],
    graphColumnsLeft: [
      'consommation_cannabis',
      'consommation_calmant',
      'consommation_opiace',
    ],
    graphDataNamesLeft: ['Cannabis', 'Calmant', 'Opiace'],
  },
  bipolarity: {
    name: [],
    columns: [
      'age_premier_episode',
      'mdq_qa_tot',
      'mdq_qb',
      'mdq_qc',
      'assist_q7b',
      'assist_q7c',
      'assist_q7d',
      'assist_q7e',
      'assist_q7f',
      'assist_q7g',
      'assist_q7h',
      'assist_q7i',
      'assist_q7j',
      'atcd_perso_hospi',
      'atcd_post_partum',
      'atcd_perso_suicide',
      'atcd_fam_suicide',
      'atcd_fam_depression',
      'atcd_fam_bipolaire',
      'resistance_traitement',
      'mathys_mixite',
      'gad7_severe',
      'consommation_alcool',
      'consommation_cannabis',
      'consommation_cocaine',
      'consommation_amphetamine',
      'consommation_solvant',
      'consommation_calmant',
      'consommation_hallucinogene',
      'consommation_opiace',
      'consommation_autre',
      'sommeil',
      'variation_poids',
      'appetit',
      'madrs_q9',
    ],
    graphLeftColumns: [
      'indice_bipolaire_age_debut',
      'indice_bipolaire_mdq',
      'indice_bipolaire_substance_atcd',
      'indice_bipolaire_atcd_dep',
      'indice_bipolaire_postpartum',
      'indice_bipolaire_atcd_perso_suicide',
      'indice_bipolaire_atcd_fam_suicide',
      'indice_bipolaire_atcd_fam_depression',
      'indice_bipolaire_atcd _fam_bipolaire',
    ],
    graphLeftDataNames: [
      'Âge précoce lors du premier épisode (< 25 ans)',
      'Risque positif de la bipolarité (via MDQ)',
      'Antécédent de consommation de substances',
      'Plusieurs épisodes dépressifs (> 2)',
      'Antécédent de dépression du post-partum',
      'Antécédent de tentatives de suicide',
      'Antécédents familiaux de suicide',
      'Antécédents familiaux de dépression',
      'Antécédents familiaux de bipolarité',
    ],
    graphRightColumns: [
      'indice_bipolaire_resistance_med',
      'indice_bipolaire_mixite',
      'indice_bipolaire_anxiete',
      'indice_bipolaire_substance_atcd',
      'indice_bipolaire_hypersomnie',
      'indice_bipolaire_poids',
      'indice_bipolaire_hyperphagie',
      'indice_bipolaire_symptome_psychotique',
      'indice_bipolaire_saisonnier',
    ],
    graphRightDataNames: [
      'Résistance aux antidépresseurs',
      'Mixité à la MAThyS',
      'Anxiété marquée (via GAD7)',
      'Comorbidité addictive',
      'Hypersomnie',
      'Prise de poids',
      'Hyperphagie',
      'Symptôme psychotique (item 9 MADRS)',
      'Caractère saisonnier des épisodes (via SPAQ)',
    ],
  },
  mathyS: {
    name: ['Emotion', 'Motricité', 'Motivation', 'Cognition', 'Sensorialite'],
    columns: [
      'mathys_emotion',
      'mathys_motricite',
      'mathys_motivation',
      'mathys_cognition',
      'mathys_sensorialite',
    ],
    activationColumns: [
      'mathys_activation_emotion',
      'mathys_activation_cognition',
      'mathys_activation_motricite',
      'mathys_activation_sensorialite',
    ],
    inhibitionColumns: [
      'mathys_inhibition_emotion',
      'mathys_inhibition_cognition',
      'mathys_inhibition_motricite',
      'mathys_inhibition_emotion',
    ],
  },
  symptoResides: {
    graphColumnsleftTop: [
      'residuel_activation_emotion',
      'residuel_activation_cognition',
      'residuel_activation_motivation',
      'residuel_activation_motricite',
      'residuel_activation_sensorialite',
    ],
    graphNamesLeftTop: [
      'Activation emotion',
      'Activation motricité',
      'Activation motivation',
      'Activation congnition',
      'Activation sensorialité',
    ],
    graphColumnsLeftBottom: [
      'residuel_inhibition_emotion',
      'residuel_inhibition_cognition',
      'residuel_inhibition_motivation',
      'residuel_inhibition_motricite',
      'residuel_inhibition_sensorialite',
    ],
    graphNamesLeftBottom: [
      'Inhibition sensorialité',
      'Inhibition congnition',
      'Inhibition motivation',
      'Inhibition motricité',
      'Inhibition émotion',
    ],
    graphColumnsRight: [
      'residuel_anxiete',
      'residuel_depression',
      'residuel_hypersomnolence',
      'residuel_insomnie',
    ],
    graphNamesRight: ['Anxiété', 'Dépression', 'Hypersomnolence', 'Insomnie'],
  },
  noGroupData: {
    suiviPsyActuel: 'suivi_psy_actuel',
  },
}

// Disease: Alcohol =====================================
export const AlcoholItemKeys = {
  troubelUsageAlcoBar: 'troubelUsageAlcoBar',
  troubelUsageAlcoGauge: 'troubelUsageAlcoGauge',
  alcoCravingBar: 'cravingBar',
  alcoCravingEvolution: 'alcoCravingEvolution',
  //consommmation
  alcoAutresConsommationBar: 'alcoAutresConsommationBar',
  // depression
  alcoDepressionBar: 'alcoDepressionBar',
  depressionGauge: 'depressionGauge',
  alcoDepressionEvolution: 'alcoDepressionEvolution',
  alcoAnxietyBar: 'anxietyBar',
  alcoAnxietyGauge: 'anxietyGauge',
  alcoAnxietyEvolution: 'alcoAnxietyEvolution',
  // insomnie
  alcoInsomnieBar: 'alcoInsomnieBar',
  alcoInsomnieGauge: 'alcoInsomnieGauge',
  alcoInsomnieEvolution: 'alcoInsomnieEvolution',
  // Impulsivity: UPPS-P-20
  impulsivityRadar: 'impulsivityRadar',
  // regulation des emotion
  regulationEmotionBarBlance: 'regulationEmotionBarBlance',
  // Auto efficity
  autoEfficacitybar: 'autoEfficacitybar',
  autoEfficacityGauge: 'autoEfficacityGauge',
  autoEfficacityEvolutionLine: 'autoEfficacityEvolutionLine',

  // motiviation changement
  alcoMotivationChangementBar: 'MotivationChangementBar',
  // soutien social
  reseauSocialGauge: 'reseauSocialGauge',
  // neuro psychologique
  alcoCongnitionBar: 'alcoCongnitionBar',
  // alliance thé
  externeAllianceTherapBar: 'externeAllianceTherapBar',
  // CTQ
  infFamilieRadar: 'infFamilieRadar',
  // quality vie
  alcoQualityVieBar: 'alcoQualityVieBar',
  alcoForceFragilityRadar: 'alcoForceFragilityRadar',
  alcoResumeEvolutionsRadar: 'alcoResumeEvolutionsRadar',
}

// ============= Disease: Depression==================
export const DepressionItemKeys = {
  interDepressionBar: 'interDepressionBar',
  depressionGauge: 'depressionGauge',
  interDepressionEvolution: 'interDepressionEvolution',

  // insomnie
  insomnieBar: 'insomnieBar',
  insomnieGauge: 'insomniegauge',
  insomnieEvolution: 'insomnieEvolution',

  // hypersomnolence
  hypersomnolenceBar: 'hypersomnolenceBar',
  hypersomnolenceGauge: 'hypersomnolenceGauge',
  hypersomnolenceEvolution: 'hypersomnolenceEvolution',

  reactiviteEmoBar: 'reactiviteEmoBar',
  reactiviteEmoRadar: 'reactiviteEmoRadar',
  reactiviteEmoEvolutionLine: 'reactiviteEmoEvolutionLine',

  indicesBipolarityGraphExpert: 'indicesBipolarityGraphExpert',
  indicesBipolarityGraphPatient: 'indicesBipolarityGraphPatient',

  dpAnxietyBar: 'anxietyBar',
  dpAnxietyGauge: 'anxietyGauge',
  dpAnxietyEvolution: 'dpAnxietyEvolution',

  // Impulsivity: UPPS-P-20
  impulsivityRadar: 'impulsivityRadar',

  consommationsSubstancesBar: 'consommationsSubstancesBar',
  consommationsSubstancesTable: 'consommationsSubstancesTable',
  consommationsSubstancesGraph: 'consommationsSubstancesGraph',

  regulationEmotionBarBlance: 'regulationEmotionBarBlance',

  autoEfficacityBar: 'autoEfficacityBar',
  autoEfficacityGauge: 'autoEfficacityGauge',

  dpReseauSocialBar: 'dpReseauSocialBar',
  reseauSocialGauge: 'reseauSocialGauge',

  externeAllianceTherapBar: 'externeAllianceTherapBar',
  infFamilieRadar: 'infFamilieRadar',
  dpForceFragilityRadar: 'dpForceFragilityRadar',
  dpSymptomesResiduelGraph: 'dpSymptomesResiduelGraph',
}
