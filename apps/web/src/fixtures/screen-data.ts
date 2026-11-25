// visual-only sample data
import type {
  IllustrativeChartData,
  PrototypeScreenData,
  ScreenDataRequest,
  ScreenField,
  ScreenRow,
  ScreenSection,
} from '../data/types';
import { illustrativeChart } from './illustrative-chart';

const NOTICE =
  'Illustrative layout only — values are neutral placeholders and no backend action is performed.';

const FORM_FIELDS: readonly ScreenField[] = [
  { label: 'Date', control: 'date', required: true },
  { label: 'Record identifier', control: 'text', required: true, hint: 'Neutral reference only' },
  {
    label: 'Quantity',
    control: 'number',
    required: false,
    hint: 'Unit pending farm configuration',
  },
  { label: 'Notes', control: 'textarea', required: false },
];

const SETTINGS_FIELDS: readonly ScreenField[] = [
  { label: 'Setting name', control: 'text', required: true },
  {
    label: 'Configured value',
    control: 'select',
    required: true,
    hint: 'Options pending owner approval',
  },
  { label: 'Effective date', control: 'date', required: false },
];

const LOGIN_FIELDS: readonly ScreenField[] = [
  { label: 'Email or approved identifier', control: 'email', required: true },
  { label: 'Password', control: 'password', required: true },
];

function metricsFor(template: string): PrototypeScreenData['metrics'] {
  if (template !== 'dashboard') {
    return [
      { label: 'Recorded items', value: 'Neutral value', unit: 'awaiting data' },
      { label: 'Current period', value: 'Not selected', unit: 'farm-local date pending' },
    ];
  }

  return [
    {
      label: 'Primary overview',
      value: 'Neutral value',
      unit: 'awaiting data',
      iconHint: 'Primary metric',
    },
    {
      label: 'Secondary overview',
      value: 'Neutral value',
      unit: 'awaiting data',
      iconHint: 'Secondary metric',
    },
    {
      label: 'Operational status',
      value: 'Not connected',
      unit: 'no live data',
      iconHint: 'Status',
    },
    {
      label: 'Reporting period',
      value: 'Not selected',
      unit: 'farm-local date pending',
      iconHint: 'Period',
    },
  ];
}

function columnsFor(template: string): readonly string[] {
  switch (template) {
    case 'list':
      return ['Reference', 'Description', 'Category', 'Status', 'Updated'];
    case 'report':
      return ['Period', 'Measure', 'Unit', 'Source', 'State'];
    case 'detail':
      return ['Field', 'Value', 'Source', 'State'];
    default:
      return ['Item', 'Value', 'Note'];
  }
}

function rowsFor(template: string): readonly ScreenRow[] {
  const status = { label: 'Neutral status', tone: 'neutral' as const };

  if (template === 'report') {
    return [
      {
        cells: [
          'Period A',
          'Neutral value',
          'neutral units',
          'visual-only fixture',
          'Illustrative',
        ],
        status,
      },
      {
        cells: [
          'Period B',
          'Neutral value',
          'neutral units',
          'visual-only fixture',
          'Illustrative',
        ],
        status,
      },
    ];
  }

  if (template === 'detail') {
    return [
      { cells: ['Reference', 'Neutral value', 'Prototype layout', 'Illustrative'], status },
      { cells: ['Category', 'Neutral value', 'Prototype layout', 'Illustrative'], status },
    ];
  }

  return [
    {
      cells: [
        'Record A',
        'Neutral description',
        'Neutral category',
        'Neutral status',
        'Not connected',
      ],
      status,
    },
    {
      cells: [
        'Record B',
        'Neutral description',
        'Neutral category',
        'Neutral status',
        'Not connected',
      ],
      status,
    },
  ];
}

function fieldsFor(template: string): readonly ScreenField[] {
  if (template === 'login') {
    return LOGIN_FIELDS;
  }

  if (template === 'settings') {
    return SETTINGS_FIELDS;
  }

  return FORM_FIELDS;
}

function sectionsFor(request: ScreenDataRequest): readonly ScreenSection[] {
  const common: ScreenSection = {
    title: 'Review information',
    body: `${request.title} is included in the approved sitemap. Field values, statuses and actions are not connected to a backend.`,
  };

  if (request.template === 'state') {
    return [
      {
        title: 'State explanation',
        body: 'This screen shows an approved state layout only. No token, email, synchronization or upload is simulated.',
      },
    ];
  }

  if (request.template === 'form' || request.template === 'settings') {
    return [
      common,
      {
        title: 'Form behaviour',
        body: 'Submission stores a local draft in fixture mode. No server record, calculation or approval is created.',
        fields: fieldsFor(request.template),
      },
    ];
  }

  return [
    common,
    {
      title: 'Structured records',
      body: 'Rows use neutral tokens and are labelled as illustrative.',
      rows: rowsFor(request.template),
    },
  ];
}

export function createScreenData(request: ScreenDataRequest): PrototypeScreenData {
  const chart: IllustrativeChartData | undefined =
    request.template === 'dashboard' || request.template === 'report'
      ? illustrativeChart
      : undefined;

  return {
    notice: NOTICE,
    summary: request.description,
    metrics: metricsFor(request.template),
    columns: columnsFor(request.template),
    rows: rowsFor(request.template),
    fields: fieldsFor(request.template),
    sections: sectionsFor(request),
    actions: ['Open local draft', 'Cancel'],
    chart,
  };
}
