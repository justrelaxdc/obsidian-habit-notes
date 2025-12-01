// Performance constants
export const MOBILE_BREAKPOINT = 768;
export const MAX_DAYS_BACK = 3650;
export const DEFAULT_DAYS_TO_SHOW = 30;
export const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
export const MAX_CACHE_SIZE = 100;
export const SCROLL_RESTORE_DELAY_MS = 50;
export const DEBOUNCE_DELAY_MS = 300;

// Timeout and delay constants
export const FILE_UPDATE_DELAY_MS = 300; // Delay for file update after create/rename
export const ANIMATION_DURATION_MS = 300; // Animation duration for UI updates
export const ANIMATION_DURATION_SHORT_MS = 200; // Short animation duration for UI updates
export const SCROLL_RESTORE_DELAY_2_MS = 100; // Second delay for scroll restoration
export const IMMEDIATE_TIMEOUT_MS = 0; // Immediate timeout
export const NOTICE_TIMEOUT_MS = 2000; // Timeout for notice messages

// Tracker types
export const TrackerType = {
  GOOD_HABIT: 'good-habit',
  BAD_HABIT: 'bad-habit',
  NUMBER: 'number',
  SCALE: 'scale',
  PLUSMINUS: 'plusminus',
  TEXT: 'text',
} as const;

export type TrackerTypeValue = typeof TrackerType[keyof typeof TrackerType];

// View modes
export const ViewMode = {
  CONTROL: 'control',
  DISPLAY: 'display',
} as const;

export type ViewModeValue = typeof ViewMode[keyof typeof ViewMode];

// CSS Classes
export const CSS_CLASSES = {
  // Main container
  TRACKER_NOTES: 'tracker-notes',
  TRACKER_NOTES_HEADER: 'tracker-notes__header',
  TRACKER_NOTES_HIERARCHY: 'tracker-notes__hierarchy',
  
  // Tracker item
  TRACKER: 'tracker-notes__tracker',
  TRACKER_HEADER: 'tracker-notes__tracker-header',
  TRACKER_TITLE: 'tracker-notes__tracker-title',
  TRACKER_CONTROLS: 'tracker-notes__controls',
  SETTINGS_BTN: 'tracker-notes__settings-btn',
  ORDER_BTN_CONTAINER: 'tracker-notes__order-btns',
  ORDER_BTN_UP: 'tracker-notes__order-btn-up',
  ORDER_BTN_DOWN: 'tracker-notes__order-btn-down',
  
  // Controls
  ROW: 'tracker-notes__row',
  VALUE: 'tracker-notes__value',
  VALUE_UPDATED: 'updated',
  
  // Text input
  TEXT_INPUT: 'tracker-notes__text-input',
  
  // Scale/Progress bar
  PROGRESS_BAR_WRAPPER: 'tracker-notes__progress-bar-wrapper',
  PROGRESS_BAR_INPUT: 'tracker-notes__progress-bar-input',
  PROGRESS_BAR_PROGRESS: 'tracker-notes__progress-bar-progress',
  PROGRESS_BAR_VALUE: 'tracker-notes__progress-bar-value',
  PROGRESS_BAR_LABEL_LEFT: 'tracker-notes__progress-bar-label-left',
  PROGRESS_BAR_LABEL_RIGHT: 'tracker-notes__progress-bar-label-right',
  
  // Heatmap
  HEATMAP: 'tracker-notes__heatmap',
  HEATMAP_DAY: 'tracker-notes__heatmap-day',
  HEATMAP_DAY_HAS_VALUE: 'has-value',
  HEATMAP_DAY_START: 'start-day',
  
  // Calendar
  CALENDAR: 'tracker-notes__calendar',
  CALENDAR_DAY: 'tracker-notes__calendar-day',
  CALENDAR_DAY_HAS_VALUE: 'has-value',
  CALENDAR_DAY_START: 'start-day',
  
  // Visualizations
  CHART: 'tracker-notes__chart',
  STATS: 'tracker-notes__stats',
  
  // Date picker
  DATE_PICKER_CONTAINER: 'tracker-notes__date-picker-container',
  DATE_PICKER: 'tracker-notes__date-picker',
  DATE_INPUT: 'tracker-notes__date-input',
  DATE_INPUT_UPDATING: 'is-updating',
  DATE_NAV_BTN: 'tracker-notes__date-nav-btn',
  DATE_NAV_BTN_LEFT: 'tracker-notes__date-nav-btn-left',
  DATE_NAV_BTN_RIGHT: 'tracker-notes__date-nav-btn-right',
  
  // Loading
  LOADING: 'tracker-notes__loading',
  LOADING_ACTIVE: 'is-active',
  LOADING_DOT: 'tracker-notes__loading-dot',
  
  // Folder structure
  FOLDER_NODE: 'tracker-notes__folder-node',
  FOLDER_HEADER: 'tracker-notes__folder-header',
  TRACKERS_CONTAINER: 'tracker-notes__trackers',
  
  // Messages
  ERROR: 'tracker-notes__error',
  SUCCESS: 'tracker-notes__success',
  
  // Limit indicators
  LIMIT_ERROR: 'tracker-notes__limit-error',
  LIMIT_SUCCESS: 'tracker-notes__limit-success',
} as const;

// CSS Variables (Obsidian theme)
export const CSS_VARIABLES = {
  // Colors
  INTERACTIVE_ACCENT: '--interactive-accent',
  COLOR_ACCENT: '--color-accent',
  ACCENT_COLOR: '--accent-color',
  TEXT_MUTED: '--text-muted',
  TEXT_FAINT: '--text-faint',
  TEXT_NORMAL: '--text-normal',
  TEXT_ERROR: '--text-error',
  TEXT_SUCCESS: '--text-success',
  TEXT_ACCENT: '--text-accent',
  TEXT_ON_ACCENT: '--text-on-accent',
  
  // Backgrounds
  BACKGROUND_PRIMARY: '--background-primary',
  BACKGROUND_SECONDARY: '--background-secondary',
  BACKGROUND_MODIFIER_BORDER: '--background-modifier-border',
  BACKGROUND_MODIFIER_BORDER_HOVER: '--background-modifier-border-hover',
  BACKGROUND_MODIFIER_BORDER_FOCUS: '--background-modifier-border-focus',
  
  // Interactive
  INTERACTIVE_NORMAL: '--interactive-normal',
  INTERACTIVE_HOVER: '--interactive-hover',
  INTERACTIVE_ACCENT_HOVER: '--interactive-accent-hover',
  
  // Fonts
  FONT_TEXT: '--font-text',
  FONT_UI_SMALL: '--font-ui-small',
} as const;

// Default fallback colors
export const FALLBACK_COLORS = {
  ACCENT: '#7f6df2',
  TEXT_MUTED: '#999999',
  TEXT_FAINT: '#666666',
  TEXT_ERROR: '#c00000',
  TEXT_SUCCESS: '#00c000',
  BORDER: '#e0e0e0',
  BG_PRIMARY: '#ffffff',
} as const;

// Chart configuration
export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 200,
  CANVAS_HEIGHT: 180,
  POINT_RADIUS: 3,
  POINT_BORDER_WIDTH: 2,
  POINT_HOVER_RADIUS: 5,
  POINT_HIT_RADIUS: 10,
  BORDER_WIDTH: 2.5,
  LINE_TENSION: 0.4,
  MAX_TICKS_LIMIT: 10,
  GRID_LINE_WIDTH: 1,
  FONT_SIZE_SMALL: 11,
  FUTURE_DAYS_OFFSET: 5, // Show 5 days ahead in chart
  GRADIENT_HEIGHT: 180,
  OPACITY_LIGHT: 0.25,
  OPACITY_DARK: 0.1,
  OPACITY_MEDIUM: 0.3,
  PADDING_FACTOR: 0.1,
  LINE_WIDTH: 2,
} as const;

// Date formats
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DD',
  ISO_SLASH: 'YYYY/MM/DD',
  EU: 'DD.MM.YYYY',
  DISPLAY_SHORT: 'D MMM',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NO_TRACKERS: 'no trackers found in folder',
  NO_FRONTMATTER: 'Frontmatter not found',
  ENTER_NAME: 'Enter name',
  CREATE_ERROR: 'Error creating tracker',
  UPDATE_ERROR: 'Error updating tracker',
  WRITE_ERROR: 'Write error',
  READ_ERROR: 'Read error',
  RENDER_ERROR: 'error processing block',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  TRACKER_CREATED: 'Tracker created',
  TRACKER_UPDATED: 'Tracker updated',
  TRACKER_DELETED: 'Tracker deleted',
  VALUE_SAVED: '✓ Saved',
} as const;

// Input placeholders
export const PLACEHOLDERS = {
  TRACKER_NAME: 'e.g., Morning workout',
  UNIT: 'Default: none',
  TEXT_INPUT: 'Enter text...',
  NUMBER_INPUT: '0',
  LIMIT_NONE: 'Default: none',
} as const;

// Tracker type labels
export const TRACKER_TYPE_LABELS = {
  [TrackerType.GOOD_HABIT]: 'Good habit',
  [TrackerType.BAD_HABIT]: 'Bad habit',
  [TrackerType.NUMBER]: 'Number',
  [TrackerType.SCALE]: 'Scale',
  [TrackerType.PLUSMINUS]: 'Counter (+/-)',
  [TrackerType.TEXT]: 'Text',
} as const;

// Modal labels
export const MODAL_LABELS = {
  CREATE_TRACKER: 'Create new tracker',
  EDIT_TRACKER: 'Edit tracker',
  NAME: 'Name',
  PATH: 'Path',
  TYPE: 'Type',
  PARAMETERS: 'Parameters',
  UNIT: 'Unit',
  STEP: 'Step',
  VALUE_FROM: 'Value "from"',
  VALUE_TO: 'Value "to"',
  LIMITS: 'Success limits',
  LOWER_LIMIT: 'Lower limit',
  UPPER_LIMIT: 'Upper limit',
  CREATE: 'Create',
  SAVE: 'Save',
  DELETE: 'Delete',
  DELETE_CONFIRM_TITLE: 'Delete tracker?',
  DELETE_CONFIRM_MESSAGE: 'Are you sure you want to delete tracker "{name}"? This action cannot be undone.',
  CANCEL: 'Cancel',
  HABITS_GROUP: 'Habits',
  METRICS_GROUP: 'Metrics',
  START_DATE: 'Tracking start date',
  LIMITS_DESCRIPTION: 'Optionally, you can make the metric limiting and set desired threshold values, they will be displayed on the chart. If the value does not fall within the specified range, you will see a color response.',
  ROOT_FOLDER: '/ (root folder)',
  NO_TRACKERS_FOUND: 'No trackers found',
  SELECT_TRACKER: 'Select tracker',
  YESTERDAY: 'Yesterday',
  TOMORROW: 'Tomorrow',
  UPDATING: 'Updating…',
  MOVE_UP: 'Move up',
  MOVE_DOWN: 'Move down',
  TRACKER_SETTINGS: 'Tracker settings',
  UPPER_LIMIT_MUST_BE_GREATER: 'Upper limit must be greater than lower limit',
  ENTER_NAME: 'Enter name',
  TRACKER_UPDATED: 'Tracker updated',
  WARNING_RECORDS_BEFORE_DATE: 'Warning: found {count} {records} BEFORE date {date}, which will be deleted when saving.',
  RECORD_SINGULAR: 'record',
  RECORDS_PLURAL: 'records',
} as const;

// Default values
export const DEFAULTS = {
  STEP: 1,
  MIN_VALUE: 0,
  MAX_VALUE: 10,
  TEXT_UNIT: 'words',
} as const;

// UI constants
export const UI_CONSTANTS = {
  FONT_WEIGHT_BOLD: "600",
  TRANSITION_OPACITY_DURATION_MS: 200,
} as const;

// Statistics labels
export const STATS_LABELS = {
  TOTAL_RECORDS: "Total records",
  LAST_DAYS: "Sum",
  CURRENT_STREAK: "Current streak",
  DAYS_SINGULAR: "day",
  DAYS_PLURAL_2_4: "days",
  DAYS_PLURAL_5_PLUS: "days",
  AVERAGE: "Average",
  MIN: "Min",
  MAX: "Max",
  MEDIAN: "Median",
  COMPLETION_RATE: "Completed",
  ACTIVE_DAYS: "Active days",
  BEST_STREAK: "Best streak",
} as const;

