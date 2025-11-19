// Performance constants
export const MOBILE_BREAKPOINT = 768;
export const MAX_DAYS_BACK = 3650;
export const DEFAULT_DAYS_TO_SHOW = 30;
export const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
export const MAX_CACHE_SIZE = 100;
export const SCROLL_RESTORE_DELAY_MS = 50;
export const DEBOUNCE_DELAY_MS = 300;

// Tracker types
export const TrackerType = {
  GOOD_HABIT: 'good-habit',
  BAD_HABIT: 'bad-habit',
  NUMBER: 'number',
  SCALE: 'scale',
  PLUSMINUS: 'plusminus',
  TEXT: 'text',
  CHECKBOX: 'checkbox',
  RATING: 'rating',
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
  
  // Controls
  ROW: 'tracker-notes__row',
  VALUE: 'tracker-notes__value',
  VALUE_UPDATED: 'updated',
  
  // Rating
  RATING: 'tracker-notes__rating',
  RATING_STAR: 'tracker-notes__rating-star',
  RATING_STAR_ACTIVE: 'active',
  
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
  NO_TRACKERS: 'в папке не найдено трекеров',
  NO_FRONTMATTER: 'Frontmatter не найден',
  ENTER_NAME: 'Введите название',
  CREATE_ERROR: 'Ошибка при создании трекера',
  UPDATE_ERROR: 'Ошибка при обновлении трекера',
  WRITE_ERROR: 'Ошибка записи',
  READ_ERROR: 'Ошибка чтения',
  RENDER_ERROR: 'ошибка при обработке блока',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  TRACKER_CREATED: 'Создан трекер',
  TRACKER_UPDATED: 'Трекер обновлен',
  TRACKER_DELETED: 'Трекер удален',
  VALUE_SAVED: '✓ Записано',
  RATING_SAVED: '⭐ Оценка',
} as const;

// Input placeholders
export const PLACEHOLDERS = {
  TRACKER_NAME: 'Например: Утренняя зарядка',
  UNIT: 'Например: метры, минуты, кг',
  TEXT_INPUT: 'Введите текст...',
  NUMBER_INPUT: '0',
  LIMIT_NONE: 'По умолчанию - нет',
} as const;

// Tracker type labels
export const TRACKER_TYPE_LABELS = {
  [TrackerType.GOOD_HABIT]: 'Хорошая привычка',
  [TrackerType.BAD_HABIT]: 'Плохая привычка',
  [TrackerType.NUMBER]: 'Число',
  [TrackerType.SCALE]: 'Шкала',
  [TrackerType.PLUSMINUS]: 'Счётчик (+/-)',
  [TrackerType.TEXT]: 'Текст',
  [TrackerType.CHECKBOX]: 'Чекбокс',
  [TrackerType.RATING]: 'Рейтинг',
} as const;

// Modal labels
export const MODAL_LABELS = {
  CREATE_TRACKER: 'Создать новый трекер',
  EDIT_TRACKER: 'Редактировать трекер',
  NAME: 'Название',
  PATH: 'Путь',
  TYPE: 'Тип',
  PARAMETERS: 'Параметры',
  UNIT: 'Единица измерения',
  STEP: 'Шаг',
  VALUE_FROM: 'Значение "от"',
  VALUE_TO: 'Значение "до"',
  LIMITS: 'Лимиты успешности',
  LOWER_LIMIT: 'Нижняя граница',
  UPPER_LIMIT: 'Верхняя граница',
  CREATE: 'Создать',
  SAVE: 'Сохранить',
  DELETE: 'Удалить',
  DELETE_CONFIRM_TITLE: 'Удалить трекер?',
  DELETE_CONFIRM_MESSAGE: 'Вы уверены, что хотите удалить трекер "{name}"? Это действие нельзя отменить.',
  CANCEL: 'Отмена',
  HABITS_GROUP: 'Привычки',
  METRICS_GROUP: 'Метрики',
} as const;

// Default values
export const DEFAULTS = {
  STEP: 1,
  MIN_VALUE: 0,
  MAX_VALUE: 10,
  MAX_RATING: 5,
  TEXT_UNIT: 'слов',
} as const;

