export const LOCALE_SHORTHANDS = {
  english: 'en-US',
  hindi: 'hi',
  telugu: 'te',
  kannada: 'en-US',
  gujarati: 'gu',
  marathi: 'en-US',
  tamil: 'ta',
  bengali: 'bn',
  punjabi: 'en-US',
  malayalam: 'en-US',
  odiya: 'en-US'
}

export const STATISTIC_DEFINITIONS = {
  users: {
    displayName: 'users',
    color: '#ff073a',
    format: 'int',
    options: { key: 'users' }
  },
  active: {
    displayName: 'active',
    color: '#007bff',
    format: 'int',
    options: { key: 'active' },
    hideDelta: true
  },
  sessions: {
    displayName: 'sessions',
    color: '#28a745',
    format: 'int',
    options: { key: 'sessions' }
  },
  bounce: {
    displayName: 'bounce',
    color: '#6c757d',
    format: 'int',
    options: { key: 'bounce' }
  },
  other: {
    displayName: 'other',
    format: 'int',
    options: { key: 'other' }
  },
  tested: {
    displayName: 'tested',
    color: '#4b1eaa',
    format: 'short',
    options: { key: 'tested' }
  },
  vaccinated: {
    displayName: 'vaccine doses administered',
    color: '#fb5581',
    format: 'short',
    options: { key: 'vaccinated' }
  },
  activeRatio: {
    displayName: 'active ratio',
    format: '%',
    options: {
      key: 'active',
      normalizeByKey: 'confirmed',
      multiplyFactor: 100
    },
    hideDelta: true
  },
  recoveryRatio: {
    displayName: 'recovery ratio',
    format: '%',
    options: {
      key: 'recovered',
      normalizeByKey: 'confirmed',
      multiplyFactor: 100
    },
    hideDelta: true
  },
  cfr: {
    displayName: 'case fatality ratio',
    format: '%',
    options: {
      key: 'deceased',
      normalizeByKey: 'confirmed',
      multiplyFactor: 100
    },
    hideDelta: true
  },
  tpr: {
    displayName: 'test positivity ratio',
    format: '%',
    options: {
      key: 'confirmed',
      normalizeByKey: 'tested',
      multiplyFactor: 100
    },
    hideDelta: true
  },
  population: {
    displayName: 'population',
    format: 'short',
    options: { key: 'population' },
    hideDelta: true
  }
}

const definitions = Object.keys(STATISTIC_DEFINITIONS).reduce(
  (acc, statistic) => {
    const { options, ...config } = STATISTIC_DEFINITIONS[statistic]
    acc.options[statistic] = options
    acc.configs[statistic] = config
    return acc
  },
  { options: {}, configs: {} }
)

export const STATISTIC_CONFIGS = definitions.configs
export const STATISTIC_OPTIONS = definitions.options

export const PER_MILLION_OPTIONS = {
  normalizeByKey: 'population',
  multiplyFactor: 1e6
}

export const NAN_STATISTICS = ['tested', 'vaccinated', 'tpr', 'population']

export const PRIMARY_STATISTICS = [
  'users',
  'active',
  'sessions',
  'bounce'
]

export const BRUSH_STATISTICS = ['other', 'deceased', 'recovered', 'active']

export const TABLE_STATISTICS = [...PRIMARY_STATISTICS, 'tested', 'vaccinated']

export const TABLE_STATISTICS_EXPANDED = Object.keys(STATISTIC_DEFINITIONS)

export const TIMESERIES_STATISTICS = [
  ...PRIMARY_STATISTICS
]

export const UPDATES_COUNT = 5

export const DISTRICT_TABLE_COUNT = 40

export const D3_TRANSITION_DURATION = 300

export const MINIGRAPH_LOOKBACK_DAYS = 20

export const TESTED_LOOKBACK_DAYS = 7

export const UNASSIGNED_STATE_CODE = 'UN'

export const UNKNOWN_DISTRICT_KEY = 'Unknown'

export const ISO_DATE_REGEX = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/g

export const INDIA_ISO_SUFFIX = 'T00:00:00+05:30'

export const SPRING_CONFIG_NUMBERS = { clamp: true, precision: 1 }

export const TIMESERIES_CHART_TYPES = {
  total: 'Cumulative',
  delta: 'Daily'
}

export const footerData = [
  {
    label: 'Help & Support',
    key: 'helpSupport',
    categories: [
      {
        label: 'Status',
        key: 'status',
        href: 'https://status.cool.bio'
      },
      {
        label: 'Blog',
        key: 'blog',
        href: '#'
      },
      {
        label: 'Help',
        key: 'help',
        href: '#'
      },
      {
        label: 'Getting Started',
        key: 'gettingStarted',
        href: '#'
      },
      {
        label: 'FAQs',
        key: 'fAQs',
        href: '#'
      }
    ]
  },
  {
    label: 'Legal',
    key: 'legal',
    categories: [
      {
        label: 'Terms & Conditions',
        key: 'termsConditions',
        href: '#'
      },
      {
        label: 'Privacy Policy',
        key: 'privacyPolicy',
        href: '#'
      }
    ]
  }
]

export const pricesData = [
  {
    month: 0,
    year: 0,
    title: 'Free',
    label: 'Perfect for hobby projects and experiments.',
    views: '100k',
    key: 'free',
    color: 'red'
  },
  {
    month: 4,
    year: 36,
    title: 'Startups',
    label: 'Perfect for Startups.',
    views: '1M',
    key: 'startups',
    color: 'blue'
  },
  {
    month: 4,
    year: 36,
    title: 'Pay As You Go',
    label: 'Perfect for anyone, scaling rapidly.',
    views: '1M+',
    key: 'payAsYouGo',
    color: 'green'
  },
  {
    month: 10,
    year: 100,
    title: 'Enterprise',
    label: 'Perfect for Enterprise',
    views: '5M+',
    key: 'enterprise',
    color: 'gray'
  }
]
